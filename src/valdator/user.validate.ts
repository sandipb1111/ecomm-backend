import { z } from "zod"

export const createPostDto = z.object({
    body: z.object({
        // id: z.string({
        //     required_error: 'id is required',
        // }),
        password: z.string({
            required_error: "password is required",
        }),
        phone_number: z.string({
            required_error: "Please include your phone number",
        }),
        email: z
            .string({
                required_error: "email is required",
            })
            .email("not a valid email"),
    }),
})

export const createAdminDto = z.object({
    body: z.object({
        // id: z.string({
        //     required_error: 'id is required',
        // }),
        password: z.string({
            required_error: "password is required",
        }),
        is_admin: z.boolean().optional().default(false),
        phone_number: z.string({
            required_error: "Please include your phone number",
        }),

        email: z
            .string({
                required_error: "email is required",
            })
            .email("not a valid email"),
    }),
})
