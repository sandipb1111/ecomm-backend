import * as Boom from "@hapi/boom"
import { PrismaClient, Product } from "@prisma/client"
const prisma = new PrismaClient()

export const getProduct = async (id: number) => {
    try {
        return await prisma.product.findFirstOrThrow({
            where: {
                id,
            },
            select: {
                id: true,
                category_id: false,
                name: true,
                product_image: true,
                description: true,
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
        const product = await prisma.product.findMany({
            select: {
                id: true,
                category_id: false,
                name: true,
                product_image: true,
                description: true,
            },
        })
        console.log(product)
    } catch (err: any) {
        if (err.code === "P2025") {
            throw Boom.notFound("No records found")
        }
    }
}

export const setProduct = async (product: Product) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const { name, description, product_image, category_id } = product
        const products = await prisma.product.create({
            data: {
                id: Math.ceil(Math.random() * 100),
                name,
                description,
                product_image,
                category_id,
            },
            select: {
                id: true,
                category_id: false,
                name: true,
                product_image: true,
                description: true,
            },
        })
        return products
    } catch (err) {
        throw err
    }
}

export const updateProduct = async (id: number, product: Product) => {
    try {
        const { name, description, product_image } = product
        const products = await prisma.product.update({
            where: {
                id,
            },
            data: {
                id: Math.ceil(Math.random() * 100),
                name,
                description,
                product_image,
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
