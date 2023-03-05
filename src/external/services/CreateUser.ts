import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface CreateUserDto {
    cpf:string
    name:string
    email:string
    phone_number:string
    password:string
    confirm:string
}


export const createUserService = async ( api:AxiosInstance, { cpf , password , email , name , phone_number } :CreateUserDto ): Promise<Either<AppError , TokenType >> => {
    try{
        const result = await api.post('/user' , { cpf , password , email , name , phone_number })
        return Right.create(result.data)
    }
    catch ( error ){
        console.log(error)
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}
