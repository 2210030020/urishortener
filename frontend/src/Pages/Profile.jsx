import React, { useEffect, useState } from "react";
import { Card, Avatar, Text, Stack, Center } from "@mantine/core";
import Service from "../utils/http";

import profilePic from "../assets/image.png";

const Profile = () => {
    const service = new Service();
    const [user, setUser] = useState(null);

    const getData = async () => {
        try {
            const response = await service.get("user/me");
            console.log("User Data:", response);
            setUser(response);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (!user) {
        return (
            <Center h="100vh">
                <Text size="lg" fw={500}>
                    Loading profile...
                </Text>
            </Center>
        );
    }

    return (
        <Center h="100vh">
            <Card shadow="md" radius="lg" padding="xl" withBorder>
                <Stack align="center" spacing="md">
                    <Avatar src={profilePic} size={120} radius="50%" />
                    <Text size="xl" fw={700}>
                        {user.name  ||"User"}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {user.email}
                    </Text>
                    <Text size="sm" fw={500}>
                        Branch: {user.branch||  "CSE"}
                    </Text>
                    <Text size="sm" fw={500}>
                        User ID: {user._id}
                    </Text>
                    <Text size="sm" fw={500}>
                        Created At: {new Date(user.createdAt).toLocaleDateString()}
                    </Text>
                </Stack>
            </Card>
        </Center>
    );
};

export default Profile;
