import { z } from "zod"

export const productValidate = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required",
        }),
        description: z.string({
            required_error: "description is required",
        }),
        product_image: z.string({
            required_error: "Image is required",
        }),
        category_id: z.number().optional(),
    }),
})

export const categoryValidate = z.object({
    body: z.object({
        category_name: z.string({
            required_error: "name is required",
        }),
    }),
})
