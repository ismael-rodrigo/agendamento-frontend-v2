import { UserType } from './../../types/entities/User';
import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface LoginUserDto {
    cpf:string
    password:string
}

export type LoginResponse = {
    user:UserType
    token:TokenType
}

export const loginUser = async ( api:AxiosInstance, { cpf ,password }:LoginUserDto ): Promise<Either<AppError , LoginResponse >> => {
    try{
        const result = await api.post('/user/login' , { cpf , password })
        return Right.create(result.data)
    }
    catch ( error ){
        
        if(error instanceof AxiosError){

            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status , type:error.response?.data.type}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}