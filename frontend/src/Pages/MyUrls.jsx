import React, { useEffect, useState } from "react";
import {
  Anchor,
  Button,
  Modal,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Service from "../utils/http";

const MyUrls = () => {
  const [data, setData] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedURL, setUpdatedURL] = useState("");

  const service = new Service();

  // ✅ Fetch URLs
  const getData = async () => {
    try {
      const response = await service.get("user/my/urls");
      console.log(response);
      // backend may return {data: [...] } or {shortURLs: [...]}
      setData(response.data || response.shortURLs || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ Update URL (title/original URL)
  const updateURL = async () => {
    if (!selectedUrl) return;
    try {
      const response = await service.patch(`s/${selectedUrl.shortCode}`, {
        title: updatedTitle,
        originalUrl: updatedURL,
      });
      console.log("Updated:", response);
      setOpen(false);
      getData(); // refresh table
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Delete URL
  const deleteURL = async (shortCode) => {
    try {
      await service.delete(`s/${shortCode}`);
      getData(); // refresh table
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Edit Modal */}
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Edit URL"
        centered
      >
        <TextInput
          label="Original URL"
          placeholder="Enter the original URL"
          value={updatedURL}
          onChange={(e) => setUpdatedURL(e.target.value)}
        />
        <TextInput
          label="Title"
          placeholder="Enter title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          mt="md"
        />
        <Button fullWidth mt="md" onClick={updateURL}>
          Update URL
        </Button>
      </Modal>

      {/* URL Table */}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Short URL</Table.Th>
            <Table.Th>Click Count</Table.Th>
            <Table.Th>Created Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data?.map((d) => (
            <Table.Tr key={d._id || d.shortCode}>
              <Table.Td>{d?.title || "No Title"}</Table.Td>

              <Table.Td>
                <Anchor href={d?.originalUrl} target="_blank">
                  {d?.originalUrl}
                </Anchor>
              </Table.Td>

              <Table.Td>
                <Anchor
                  href={`${service.getBaseURL()}/api/s/${d?.shortCode}`}
                  target="_blank"
                >
                  {d?.shortCode}
                </Anchor>
              </Table.Td>

              <Table.Td>{d?.clickCount || 0}</Table.Td>
              <Table.Td>
                {d?.createdAt
                  ? new Date(d.createdAt).toLocaleDateString()
                  : "NA"}
              </Table.Td>
              <Table.Td>{d?.isActive ? "Active" : "Not Active"}</Table.Td>

              <Table.Td>
                <Button
                  variant="subtle"
                  onClick={() => {
                    setSelectedUrl(d);
                    setUpdatedTitle(d?.title || "");
                    setUpdatedURL(d?.originalUrl || "");
                    setOpen(true);
                  }}
                >
                  <IconEdit size={18} />
                </Button>

                <Button
                  variant="subtle"
                  color="red"
                  onClick={() => deleteURL(d?.shortCode)}
                >
                  <IconTrash size={18} />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default MyUrls;

