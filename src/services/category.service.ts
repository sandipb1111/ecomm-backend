import * as Boom from "@hapi/boom"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getProduct = async (id: number) => {
    try {
        return await prisma.productCategory.findFirstOrThrow({
            where: {
                id,
            },
            select: {
                id: true,
                category_name: false,
            },
        })
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Record not found")
        } else {
            throw err
        }
    }
}

export const getAll = async () => {
    try {
        console.log("This is get all")
        const product = await prisma.productCategory.findMany({
            select: {
                id: true,
                category_name: true,
            },
        })
        return product
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("No records found")
        }
    }
}

export const setProduct = async (product: any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const { category_name } = product
        const products = await prisma.productCategory.create({
            data: {
                id: Math.ceil(Math.random() * 1000),
                category_name,
            },
            select: {
                id: true,
                category_name: true,
            },
        })
        return products
    } catch (err) {
        throw err
    }
}

export const updateProduct = async (id: number, product: any) => {
    try {
        const { category_name } = product
        const products = await prisma.productCategory.update({
            where: {
                id,
            },
            data: {
                category_name,
            },
        })
        return products
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("Record doesnot match")
        } else {
            throw err
        }
    }
}

export const deleteProduct = async (id: number) => {
    return await prisma.product.delete({ where: { id } })
}
