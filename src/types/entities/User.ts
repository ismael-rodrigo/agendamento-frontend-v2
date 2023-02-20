import { z } from "zod";




export const userSchema = z.object({
    cpf:z.string(),
    date_birth:z.date(),
    email: z.string().email(),
    name:z.string().min(2).max(77),
    phone_number:z.string()
})

export type UserType = z.infer<typeof userSchema> 





