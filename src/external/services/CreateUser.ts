import { UserType } from './../../types/entities/User';
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

export type CreateUserResponse = {
    user:UserType
    token:TokenType
}


export const createUserService = async ( api:AxiosInstance, { cpf , password , email , name , phone_number } :CreateUserDto ): Promise<Either<AppError , CreateUserResponse >> => {
    try{
        const result = await api.post('/user' , { cpf , password , email , name , phone_number })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status , type:error.response?.data.type}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}
