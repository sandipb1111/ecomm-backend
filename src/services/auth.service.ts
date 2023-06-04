/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Boom from "@hapi/boom"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()

export const login = async (email: string, password: string) => {
    let user: any
    try {
        user = await prisma.user.findFirstOrThrow({
            where: {
                email,
            },
        })
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Record does not exist")
        }
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw Boom.unauthorized("Password Does not match")
    }
    const accessToken = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        "random-secret-access",
        {
            expiresIn: "1h",
        }
    )
    const refreshToken = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        "random-secret-refresh",
        {
            expiresIn: "1h",
        }
    )
    console.log(refreshToken)
    return { success: true, accessToken }
}

export const register = async (user: any) => {
    try {
        const { email, password } = user
        const users = await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password as string, 10),
            },
            select: {
                email: true,
                addresses: true,
                phone_number: true,
                id: true,
            },
        })
        return users
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.badRequest("Email already exist")
        }
        if (err.code === "P2002") {
            throw Boom.badRequest("Email already exist")
        } else {
            throw err
        }
    }
}
