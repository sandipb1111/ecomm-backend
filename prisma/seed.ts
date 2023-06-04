/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// seed.ts

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
    try {
        // Create product categories
        const categoryPromises = Array.from({ length: 10 }).map((_, index) => {
            return prisma.productCategory.create({
                data: {
                    category_name: `Category ${index + 1}`,
                },
            })
        })

        const categories = await Promise.all(categoryPromises)

        // Create products
        const productPromises = categories.flatMap((category) => {
            return Array.from({ length: 10 }).map((_, index) => {
                return prisma.product.create({
                    data: {
                        name: `Product ${index + 1}`,
                        category_id: category.id,
                        description: `Description for Product ${index + 1}`,
                        product_image: `product_${index + 1}.jpg`,
                    },
                })
            })
        })

        const products = await Promise.all(productPromises)

        // Create product items
        const itemPromises = products.flatMap((product) => {
            return Array.from({ length: 10 }).map((_, index) => {
                return prisma.productItem.create({
                    data: {
                        product_id: product.id,
                        SKU: `SKU_${index + 1}`,
                        quantity_in_stock: Math.floor(Math.random() * 100),
                        product_image: `product_${product.id}_${index + 1}.jpg`,
                        price: parseFloat((Math.random() * 1000).toFixed(2)),
                    },
                })
            })
        })

        const items = await Promise.all(itemPromises)

        // Create variations
        const variationPromises = categories.flatMap((category) => {
            return Array.from({ length: 5 }).map((_, index) => {
                return prisma.variation.create({
                    data: {
                        category_id: category.id,
                        name: `Variation ${index + 1}`,
                    },
                })
            })
        })

        const variations = await Promise.all(variationPromises)

        // Create variation options
        const optionPromises = variations.flatMap((variation) => {
            return Array.from({ length: 5 }).map((_, index) => {
                return prisma.variationOption.create({
                    data: {
                        variation_id: variation.id,
                        value: `Option ${index + 1}`,
                    },
                })
            })
        })

        const options = await Promise.all(optionPromises)

        // Create product configurations
        const configurationPromises = items.flatMap((item) => {
            return options.map((option) => {
                return prisma.productConfiguration.create({
                    data: {
                        product_item_id: item.id,
                        variation_option_id: option.id,
                    },
                })
            })
        })

        await Promise.all(configurationPromises)

        // Create shipping methods
        const shippingMethodPromises = Array.from({ length: 5 }).map(
            (_, index) => {
                return prisma.shippingMethod.create({
                    data: {
                        name: `Shipping Method ${index + 1}`,
                        price: parseFloat((Math.random() * 50).toFixed(2)),
                    },
                })
            }
        )

        await Promise.all(shippingMethodPromises)

        // Create order statuses
        const orderStatusPromises = Array.from({ length: 5 }).map(
            (_, index) => {
                return prisma.orderStatus.create({
                    data: {
                        status: `Status ${index + 1}`,
                    },
                })
            }
        )

        await Promise.all(orderStatusPromises)

        console.log("Seed data created successfully")
    } catch (error) {
        console.error("Error seeding data:", error)
    } finally {
        await prisma.$disconnect()
    }
}

seed()
