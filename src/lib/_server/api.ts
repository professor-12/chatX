"use server";
import { checkAuth } from "./auth";
import prisma from "../prisma";

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
        return { error, data: null };
    }
};

export const createContact = async (contactId: string) => {
    const { data, error } = await checkAuth();
    if (error) {
        return { data: null, error };
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
    return await prisma.user.findMany();
};
