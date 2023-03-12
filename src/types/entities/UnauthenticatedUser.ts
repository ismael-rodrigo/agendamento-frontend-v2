import { z } from "zod"

export type UnauthenticatedUserType = {
    cpf:string
    name:string
    phone_number:string
}


export const unauthenticatedUserSchema = z.object({
    cpf:z.string().length(11),//.refine((value)=> cpf.isValid(value) ),
    name:z.string().min(2).max(77)
        .regex(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/gm)
    ,
    phone_number:z.string()
        .regex(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/ , {message: 'Telefone invalido'}),
}) 