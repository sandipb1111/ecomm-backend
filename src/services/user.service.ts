/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client"
import * as Boom from "@hapi/boom"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postUser = async (user: any) => {
    try {
        const { email, password, phone_number, isAdmin } = user
        const users = await prisma.user.create({
            data: {
                email,
                isAdmin: Boolean(isAdmin),
                id: Math.ceil(Math.random() * 100),
                phone_number,
                password: await bcrypt.hash(password as string, 10),
            },
        })
        return users
    } catch (err: any) {
        if (err.code === "P2002") {
            throw Boom.badRequest("Email already exist")
        } else {
            throw err
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
