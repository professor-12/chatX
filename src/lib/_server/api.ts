"use server";
import { checkAuth } from "./auth";
import prisma from "../prisma";
import { ERROR_CONSTANT } from "@/constants/error";

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
    const __ = await prisma.user.findMany({
        where: {
            NOT: {
                id: data,
            },
        },
        include: { profile: true },
        omit: { password: true },
        orderBy: { createdAt: "desc" },
    });

    return { data: __ };
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
    const { data } = await checkAuth();
    try {
        const directMessages = await prisma.message.findMany({
            distinct: ["senderId", "receiverId"],
            orderBy: {
                createdAt: "desc",
            },
            where: {
                OR: [
                    {
                        receiverId: data as string,
                    },
                    {
                        AND: {
                            senderId: data as string,
                            NOT: {
                                receiverId: null,
                            },
                        },
                    },
                ],
            },
            include: {
                sender: {
                    omit: { password: true },
                    include: { profile: true },
                },
                receiver: {
                    omit: { password: true },
                    include: { profile: true },
                },
                group: true,
            },
        });
        const groupChat = await prisma.message.findMany({
            where: {
                group: {
                    members: {
                        some: {
                            id: data as string,
                        },
                    },
                },
            },
            include: {
                group: { include: { members: {} } },
            },
            distinct: ["groupId"],
            orderBy: {
                createdAt: "desc",
            },
        });
        const transformedGroupChat = groupChat.map((chat, index) => {
            return {
                id: chat.group.id,
                name: chat.group.name,
                avatar: chat.group.groupPics,
                lastMessage: chat.message || "Sent an image",
                time: chat.createdAt,
                isGroup: true,
            };
        });

        const seen = new Set();
        const removeDuplicate = [...directMessages].filter(
            ({ senderId, receiverId }) => {
                const pairKey = [senderId, receiverId].sort().join("-");
                if (seen.has(pairKey)) return false;
                seen.add(pairKey);
                return true;
            }
        );

        const __ = [
            ...removeDuplicate.map((chat) => {
                const isSender = (chat.senderId as string) === (data as string);
                const contact = isSender ? chat.receiver : chat.sender;
                return {
                    id: contact?.id || "group",
                    name: contact?.name || "Unknown",
                    avatar:
                        contact?.profile?.profilePics || "/default-avatar.png",
                    lastMessage: chat?.message || "Sent an image",
                    time: chat.createdAt,
                    isGroup: false,
                };
            }),
            ...transformedGroupChat,
        ];
        return { data: __ };
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
    } catch (err) {}
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
        });
        return { data: _message, error: null };
    } catch (err) {
        return { data: null, error: "An error occured" };
    }
};

export const createGroupChat = async () => {
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

export const getHeaderDetail = async () => {};
