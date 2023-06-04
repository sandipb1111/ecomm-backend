/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Boom from "@hapi/boom"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
} from "../utils/token.utils"
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
    const accessToken = createAccessToken(user.id, user.isAdmin)

    const refreshToken = createRefreshToken(user.id, user.isAdmin)
    return { accessToken, refreshToken }
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

export const refreshToken = async (refreshToken: any) => {
    try {
        const decodedToken = verifyRefreshToken(refreshToken)
        console.log(decodedToken)
    } catch (err) {
        throw Boom.unauthorized("User is not logged in")
    }
}
