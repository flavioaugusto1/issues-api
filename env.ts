import { z } from 'zod'

const envSchema = z.object({
    TOKEN_NOTION: z.string(),
    DATABASE_ID: z.string(),
})

export const env = envSchema.parse(process.env)
