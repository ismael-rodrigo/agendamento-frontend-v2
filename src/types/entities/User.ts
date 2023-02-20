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
    phone_number:z.string().min(11).max(11)
})

export type UserType = z.infer<typeof userSchema> 





