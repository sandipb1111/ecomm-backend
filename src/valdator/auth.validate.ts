import { z } from "zod"

export const authValidate = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Please enter valid email"),

        password: z.string({
            required_error: "Password is required",
        }),
    }),
})
