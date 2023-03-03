import { z } from "zod";
import { cpf } from 'cpf-cnpj-validator'
import {differenceInYears} from 'date-fns'


export const userSchema = z.object({
    cpf:z.string().length(11),//.refine((value)=> cpf.isValid(value) ),
    date_birth:z.date().refine((value)=> {
        if(differenceInYears( new Date() , value ) > 120 || differenceInYears( new Date() , value ) < 0  ){
            return false
        }
        return true
    } ),
    email: z.string().email(),
    name:z.string().min(2).max(77),
    phone_number:z.string().min(7).max(11),
    password:z.string().min(8).max(16)
})

export type UserType = {
    id:string
    cpf:string
    name:string
    email:string
    date_birth:Date
    password:string
    phone_number:string
    
} 





