import { useState } from "react";
import { Center, Stack, TextInput, Text, Button, Anchor, Group, ActionIcon } from "@mantine/core";
import { IconCopy, IconExternalLink } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";
import Service from "../utils/http";

const UrlShortener = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [customUrl, setCustomURL] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [shortUrlData, setShortUrlData] = useState(null);

  const service = new Service();

  const getShortUrl = async () => {
    try {
      const response = await service.post("s", {
        customUrl,
        originalUrl: originalURL,
        expiresAt: date,
        title,
      });
      console.log(response);
      setShortUrlData(response);
    } catch (err) {
      console.error("Failed to shorten URL", err);
    }
  };

  const base = service.getBaseURL ? service.getBaseURL() : "https://url-shortener-bootcamp.onrender.com";
  const shortUrl = shortUrlData ? `${base}/api/s/${shortUrlData.shortCode}` : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <Center style={{ height: "90vh" }}>
      <Stack>
        {!shortUrlData ? (
          <>
            <Text size="30px">Shorten your URL here</Text>

            <TextInput
              label="Original URL"
              withAsterisk
              onChange={(e) => setOriginalURL(e.target.value)}
              value={originalURL}
            />

            <TextInput
              label="Customize Your URL (Optional)"
              onChange={(e) => setCustomURL(e.target.value)}
              value={customUrl}
            />

            <TextInput
              label="Title (Optional)"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <TextInput
              label="Expiry Date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />

            <Button onClick={getShortUrl} variant="outline" disabled={!originalURL}>
              Generate the URL
            </Button>
          </>
        ) : (
          <>
            <Text size="sm" c="dimmed">
              Short URL
            </Text>

            <Group position="center" spacing="xs" style={{ marginTop: 6 }}>
              <Anchor href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </Anchor>

              <ActionIcon onClick={handleCopy}>
                <IconCopy size={16} />
              </ActionIcon>

              <ActionIcon component="a" href={shortUrl} target="_blank" rel="noopener noreferrer">
                <IconExternalLink size={16} />
              </ActionIcon>
            </Group>

            <div style={{ marginTop: 20 }}>
              <QRCodeCanvas value={shortUrl} size={220} />
            </div>

            <div style={{ marginTop: 14 }}>
              <Text size="sm" c="dimmed">
                Original URL
              </Text>
              <Text size="sm" style={{ wordBreak: "break-word" }}>
                {shortUrlData?.originalUrl}
              </Text>
            </div>

            <Button color="red" mt="lg" onClick={() => setShortUrlData(null)}>
              Shorten another
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default UrlShortener;

