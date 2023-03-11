import { UserType } from './../../types/entities/User';
import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface RecoveryUserRequest {
    cpf:string
    email:string
}

export type RecoveryUserResponse = string

export const recoveryUserByEmail = async ( api:AxiosInstance, { cpf ,email }:RecoveryUserRequest ): Promise<Either<AppError , RecoveryUserResponse >> => {
    try{
        const result = await api.post('/user/recovery' , { cpf , email })
        return Right.create(result.data)
    }
    catch ( error ){
        
        if(error instanceof AxiosError){

            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status , type:error.response?.data.type}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}