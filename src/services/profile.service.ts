import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getProfile = async (id: number) => {
    return await prisma.user.findFirstOrThrow({
        where: {
            id,
        },
    })
}

export const updateProfile = async (id: number, user: any) => {
    return console.log("This is update profile")
}
