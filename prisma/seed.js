"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create product categories
            const categoryPromises = Array.from({ length: 10 }).map((_, index) => {
                return prisma.productCategory.create({
                    data: {
                        category_name: `Category ${index + 1}`,
                    },
                });
            });
            const categories = yield Promise.all(categoryPromises);
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
                    });
                });
            });
            const products = yield Promise.all(productPromises);
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
                    });
                });
            });
            const items = yield Promise.all(itemPromises);
            // Create variations
            const variationPromises = categories.flatMap((category) => {
                return Array.from({ length: 5 }).map((_, index) => {
                    return prisma.variation.create({
                        data: {
                            category_id: category.id,
                            name: `Variation ${index + 1}`,
                        },
                    });
                });
            });
            const variations = yield Promise.all(variationPromises);
            // Create variation options
            const optionPromises = variations.flatMap((variation) => {
                return Array.from({ length: 5 }).map((_, index) => {
                    return prisma.variationOption.create({
                        data: {
                            variation_id: variation.id,
                            value: `Option ${index + 1}`,
                        },
                    });
                });
            });
            const options = yield Promise.all(optionPromises);
            // Create product configurations
            const configurationPromises = items.flatMap((item) => {
                return options.map((option) => {
                    return prisma.productConfiguration.create({
                        data: {
                            product_item_id: item.id,
                            variation_option_id: option.id,
                        },
                    });
                });
            });
            yield Promise.all(configurationPromises);
            // Create shipping methods
            const shippingMethodPromises = Array.from({ length: 5 }).map((_, index) => {
                return prisma.shippingMethod.create({
                    data: {
                        name: `Shipping Method ${index + 1}`,
                        price: parseFloat((Math.random() * 50).toFixed(2)),
                    },
                });
            });
            yield Promise.all(shippingMethodPromises);
            // Create order statuses
            const orderStatusPromises = Array.from({ length: 5 }).map((_, index) => {
                return prisma.orderStatus.create({
                    data: {
                        status: `Status ${index + 1}`,
                    },
                });
            });
            yield Promise.all(orderStatusPromises);
            console.log("Seed data created successfully");
        }
        catch (error) {
            console.error("Error seeding data:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
seed();
