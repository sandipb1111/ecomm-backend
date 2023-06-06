import { z } from "zod"
import { userAddressValidator } from "./common.validate"

export const updateProfileBodySchema = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Should be a valid email address")
            .optional(),
        password: z
            .string({
                required_error: "Password is required",
            })
            .optional(),
        // Sometimes you may want custom validators, like this in case
        phone_number: z.string().optional(),
        addresses: userAddressValidator,
    })
    .strict()

export const updateProfileSchema = z.object({
    body: updateProfileBodySchema,
})
