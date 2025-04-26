"use server";
import { checkAuth } from "./auth";
import prisma from "../prisma";
import { ERROR_CONSTANT } from "@/constants/error";
import {
    cloudinary_config,
    d as cloudinary,
} from "../cloudinary/cloudinary.config";
import { sendNotification } from "@/notification";

cloudinary_config();

export const getContact = async () => {
    const { data } = await checkAuth();
    try {
        const userContacts = await prisma.contact.findMany({
            where: { userId: data },
            include: { contact: { include: { profile: true } } },
        });
        return { data: userContacts, error: null };
    } catch (error) {
        return { error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR, data: null };
    }
};

export const createContact = async (contactId: string) => {
    const { data } = await checkAuth();
    try {
        const newContact = await prisma.contact.create({
            data: {
                userId: data,
                contactId,
            },
        });
        return { data: newContact, error: null };
    } catch (error) {
        return { error, data: null };
    }
};

export const allUser = async () => {
    const { data } = await checkAuth();
    if (!data) {
        return { error: null };
    }
    const transformedInbox = await prisma.user.findMany({
        where: {
            NOT: {
                id: data,
            },
        },
        include: { profile: true },
        omit: { password: true },
        orderBy: { createdAt: "desc" },
    });

    return { data: transformedInbox };
};

export const getContacts = async () => {
    const { data } = await checkAuth();
    try {
        const contacts = await prisma.contact.findMany({
            where: {
                OR: [
                    { contactId: { equals: data } },
                    { userId: { equals: data } },
                ],
            },
        });
        return contacts;
    } catch (err) {}
};

export const createMessage = async (): Promise<{
    error: string | null;
    data: any;
}> => {
    const { data } = await checkAuth();
    try {
        const message = await prisma.message.create({
            data: {
                message: "Hey",
                senderId: data,
                receiverId: data,
            },
        });
        return { error: null, data: message };
    } catch (Er) {
        return { error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR, data: null };
    }
};

export const getChats = async () => {
    const { data: userId } = await checkAuth();

    try {
        // Fetch recent direct messages
        const directMessages = await prisma.message.findMany({
            where: {
                OR: [
                    { receiverId: userId },
                    {
                        senderId: userId,
                        NOT: { receiverId: null },
                    },
                ],
            },
            orderBy: { createdAt: "desc" },
            include: {
                sender: { include: { profile: true } },
                receiver: { include: { profile: true } },
            },
        });

        // Fetch groups the user is part of
        const groupChats = await prisma.group.findMany({
            where: {
                members: { some: { id: userId } },
            },
            include: {
                message: {
                    orderBy: { createdAt: "desc" },
                    take: 1, // Just fetch the latest message
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const transformedGroupChat = groupChats.map((chat) => ({
            id: chat.id,
            name: chat.name,
            avatar: chat.groupPics,
            lastMessage: chat.message[0]?.message || "Group Created",
            time: chat.message[0]?.createdAt || chat.createdAt,
            isGroup: true,
        }));

        // Remove duplicates (unique sender-receiver pairs)
        const seen = new Set();
        const uniqueDirectMessages = directMessages.filter(
            ({ senderId, receiverId }) => {
                const key = [senderId, receiverId].sort().join("-");
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            }
        );

        const transformedInbox = uniqueDirectMessages.map((msg) => {
            const isSender = msg.senderId === userId;
            const contact = isSender ? msg.receiver : msg.sender;

            return {
                id: contact?.id || "unknown",
                name: contact?.name || "Unknown",
                avatar: contact?.profile?.profilePics || "/default-avatar.png",
                lastMessage: msg.message || "Sent an image",
                time: msg.createdAt,
                isGroup: false,
            };
        });

        const combined = [...transformedInbox, ...transformedGroupChat].sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        return { data: combined };
    } catch (err) {
        return { error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR, data: null };
    }
};

export const addToContact = async (id: string) => {
    const { data } = await checkAuth();
    try {
        await prisma.contact.create({
            data: {
                contactId: id,
                userId: data as string,
            },
        });
        return { data: "Message created successfully", error: null };
    } catch (err) {
        return { error: "An error occured", data: null };
    }
};

export async function checkcontact(id: string) {
    const { data } = await checkAuth();
    try {
        const isContact = await prisma.contact.findFirst({
            where: {
                userId: data as string,
                contactId: id,
            },
        });
        return !!isContact;
    } catch (err) {
        return { error: "An error occured", data: null };
    }
}

export const getMessages = async (id: string, isGroup?: boolean) => {
    const { data } = await checkAuth();
    let messages: any;
    try {
        if (isGroup) {
            messages = await prisma.message.findMany({
                where: {
                    groupId: id,
                    group: {
                        members: {
                            some: { id: data },
                        },
                    },
                },
                include: { sender: { include: { profile: true } } },
            });
        } else {
            messages = await prisma.message.findMany({
                where: {
                    OR: [
                        { receiverId: data, senderId: id },
                        { senderId: data, receiverId: id as string },
                    ],
                },
                include: { sender: { include: { profile: true } } },
            });
        }
        return { data: messages, error: null };
    } catch (err) {
        return { error: "An error occured", data: null };
    }
};

export const getContactProfile = async (id: string, isGroup?: boolean) => {
    await checkAuth();
    try {
        const profile = await prisma.profile.findFirst({
            where: {
                userId: id,
            },
            include: {
                user: { omit: { password: true, id: true, email: true } },
            },
        });
        return {
            error: null,
            data: {
                name: profile?.user.name as string,
                profilePics: profile?.profilePics,
            },
        };
    } catch (err) {
        return { data: null, error: "An error occured" };
    }
};

export const getGroupProfile = async (id: string) => {
    await checkAuth();
    try {
        const getGroupInfo = await prisma.group.findFirst({
            where: { id },
            omit: {},
        });
        const { name, groupPics } = getGroupInfo;

        return {
            data: { name, profilePics: groupPics, ...getGroupInfo },
            error: null,
        };
    } catch (err) {
        console.log(err);
        return { data: null, error: "An error occured" };
    }
};

export const getUserProfile = async () => {
    const { data, error } = await checkAuth();
    try {
        const profile = await prisma.profile.findFirst({
            where: {
                userId: data as string,
            },
            include: {
                user: { omit: { password: true, id: true, email: true } },
            },
        });
        return {
            error: null,
            data: {
                name: profile?.user.name as string,
                profilePics: profile?.profilePics,
                ...profile,
            },
        };
    } catch (err) {
        return { data: null, error: "An error occured" };
    }
};

export const sendMessage = async ({
    receiverId,
    message,
    file,
    groupId,
}: {
    receiverId?: string;
    message?: string;
    file?: string;
    groupId?: string;
}) => {
    const { data } = await checkAuth();
    if (!message && !file) return;
    try {
        const _message = await prisma.message.create({
            data: {
                receiverId,
                senderId: data as string,
                message,
                picture: file,
                groupId,
            },
            include: {
                sender: { omit: { password: true, id: false, email: false } },
            },
        });
        sendNotificationToUser(receiverId as string, {
            senderName: _message.sender.name as string,
            message : _message.message,
        });
        return { data: _message, error: null };
    } catch (err) {
        return { data: null, error: "An error occured" };
    }
};

export const createGroupChat = async ({ name, description, groupP }) => {
    const { data: userId } = await checkAuth();
    try {
        const group = await prisma.group.create({
            data: {
                creatorId: userId as string,
                name: "Global Chat",
                members: {
                    connect: [{ id: userId }],
                },
                createdAt: new Date(Date.now()),
            },
        });
        return { data: group };
    } catch (err) {
        console.log(err);
    }
};

export const createImageURL = async (image: string) => {
    const cloudinaryUrl = "";
    return `${cloudinaryUrl}/${image}`;
};

export const uploadImage = async (file: File) => {
    await checkAuth();
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "chatapp");
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        return { data, error: null };
    } catch (err) {
        return { data: null, error: "An error occured" };
    }
};

export const handleFileUpload = async (file: string) => {
    return (await cloudinary.uploader.upload(file)).secure_url;
};

export const createGroup = async ({
    name,
    groupPics,
    description,
    members = [],
}) => {
    const { data: userId } = await checkAuth();
    try {
        const pics = await handleFileUpload(groupPics);
        const group = await prisma.group.create({
            data: {
                name,
                groupPics: pics,
                description,
                creatorId: userId,
                createdAt: new Date(Date.now()),
                admin: {
                    connect: [{ id: userId }],
                },
                members: {
                    connect: [...members, { id: userId }],
                },
            },
        });

        return group.id;
    } catch (err) {
        console.log(err);
        return { error: err };
    }
};

export const sendNotificationToUser = async (
    userId: string,
    { senderName, message }: Record<string, string>
) => {
    try {
        const subscription = await prisma.subscription.findFirst({
            where: { userId },
        });

        if (!subscription) {
            console.log("No subscription found");
            return { error: "No subscription found" };
        }
        await sendNotification(
            JSON.parse(subscription.value),
            JSON.stringify({
                title: `Message from ${senderName ?? "Chat App"}`,
                body: message ?? "You have a new message",
                icon: "i-ico.png",
                image: "i-ico.png",
            })
        );
    } catch (err) {
        console.log(err);
    }
};
