"use server";
import { checkAuth } from "./auth";
import prisma from "../prisma";
import { ERROR_CONSTANT } from "@/constants/error";

export const getUser = async () => {
    console.log(await checkAuth());
};

export const getContact = async () => {
    const { data, error } = await checkAuth();
    if (error) {
        return { data: null, error };
    }
    if (!data) {
        return { data: null };
    }
    try {
        const userContacts = await prisma.contact.findMany({
            where: { userId: data },
        });
        return { data: userContacts, error: null };
    } catch (error) {
        return { error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR, data: null };
    }
};

export const createContact = async (contactId: string) => {
    const { data, error } = await checkAuth();
    if (error) {
        throw new Error(error);
    }
    if (!data) {
        return { data: null };
    }
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
    const { data, error } = await checkAuth();
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
    const { data, error } = await checkAuth();
    if (error) {
        return { error: "not authorized", data: null };
    }
    if (!data) {
        return { error: "not authorized", data: null };
    }
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
    const { data, error } = await checkAuth();
    if (error) {
        return { error: ERROR_CONSTANT.NOT_AUTHORIZED, data: null };
    }
    if (!data) {
        return { error: ERROR_CONSTANT.NOT_AUTHORIZED, data: null };
    }
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
        console.error(Er);
        return { error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR, data: null };
    }
};

export const getChats = async () => {
    const { data, error } = await checkAuth();
    if (!data) {
        return { error };
    }

    try {
        const recentChats = await prisma.message.findMany({
            distinct: ["senderId", "receiverId"],
            orderBy: {
                createdAt: "desc",
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
            },
        });

        const __ = recentChats.map((chat) => {
            const isSender = (chat.senderId as string) === (data as string);
            const contact = isSender ? chat.receiver : chat.sender;

            return {
                id: contact?.id || "group", // Use group ID if needed
                name: contact?.name || "Unknown", // Fallback in case of no user
                avatar: contact?.profile?.profilePics || "/default-avatar.png", // Default avatar
                lastMessage: chat?.message || "Sent an image",
                time: chat.createdAt,
            };
        });
        return { data: __ };
    } catch (err) {
        return { error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR, data: null };
    }
};

export const addToContact = async (id: string) => {
    const { data, error } = await checkAuth();

    if (error) {
        return { error, data };
    }
    try {
        const usercontact = await prisma.contact.create({
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
