import { z } from "zod";
import { cpf } from 'cpf-cnpj-validator'
import {differenceInYears} from 'date-fns'


export const userSchema = z.object({
    cpf:z.string().length(11),//.refine((value)=> cpf.isValid(value) ),
    email: z.string().email(),
    name:z.string().min(2).max(77)
        .regex(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/gm)
    ,
    phone_number:z.string()
        .regex(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/ , {message: 'Telefone invalido'}),

    password:z.string()
        .min(8 , {message:'Senha deve ter no mínimo 8 caracters'})
        .max(16 , {message:'Senha deve ter no máximo 16 caracters'})
        .refine((value)=> /[A-Z]/.test(value) , { message:'Senha deve ter pelo menos 1 letra maiúscula'})
        .refine((value)=> /[a-z]/.test(value) , { message:'Senha deve ter pelo menos 1 letra minúscula'})
        .refine((value)=> /[0-9]/.test(value) , { message:'Senha deve ter pelo menos 1 número'})
    ,
    confirm:z.string().min(8).max(16)
})
//.refine((data)=> data.confirm == data.password ,{path:['confirm']})



export type UserType = {
    id:string
    cpf:string
    name:string
    email:string
    date_birth:Date
    password:string
    phone_number:string
    
} 





