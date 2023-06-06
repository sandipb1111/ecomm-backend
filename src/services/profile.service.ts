/* eslint-disable @typescript-eslint/no-unused-vars */
/*import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { updateProfileBodySchema } from "../valdator/profile.validate"
const prisma = new PrismaClient()

export const getProfile = async (id: number) => {
    return await prisma.user.findFirstOrThrow({
        where: {
            id,
        },
    })
}

export const updateProfile = async (
    id: number,
    user: z.infer<typeof updateProfileBodySchema>
) => {
    const { addresses, ...rest } = user
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { rest },
        include: {
            addresses: true,
        },
    })
}
*/
