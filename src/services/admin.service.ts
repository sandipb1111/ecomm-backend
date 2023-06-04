/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client"
import * as Boom from "@hapi/boom"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const displayOne = async (id: number) => {
    try {
        const users = await prisma.user.findFirstOrThrow({
            select: {
                id: true,
                email: true,
                phone_number: true,
                addresses: true,
            },
            where: { id: Number(id) },
        })
        return users
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Record not found")
        } else {
            throw err
        }
    }
}

export const display = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                phone_number: true,
                password: false,
            },
        })
        return users
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Post not found")
        } else {
            throw err
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async (
    email: string,
    password: string,
    isAdmin: boolean,
    phone_number: string
) => {
    try {
        const users = await prisma.user.create({
            data: {
                email,
                isAdmin,
                id: Math.ceil(Math.random() * 100),
                phone_number,
                password: await bcrypt.hash(password as string, 10),
            },
        })
        console.log("Hello i am here")
        return users
    } catch (err: any) {
        if (err.code === "P2002") {
            throw Boom.badRequest("Email already exist")
        } else {
            throw err
        }
    }
}

export const deleteUser = async (id: number) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id,
            },
        })
        return user
    } catch (error: any) {
        if (error.code === "P2025") {
            throw Boom.notAcceptable("Record not found")
        } else {
            throw error
        }
    }
}

export const updateUser = async (id: string, user: any) => {
    try {
        const { email, password, phone_number } = user
        const users = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                email,
                id: Math.ceil(Math.random() * 100),
                phone_number,
                password: await bcrypt.hash(password as string, 10),
            },
        })
        return users
    } catch (err: any) {
        if (err.code == "P2025") {
            throw Boom.notFound("Record not found")
        }
        if (err.code === "P2002") {
            throw Boom.notAcceptable("Email already is in use")
        } else {
            throw Error
        }
    }
}
