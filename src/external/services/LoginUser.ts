import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface LoginUserDto {
    cpf:number
    date_birth:Date
}


export const loginUser = async ( api:AxiosInstance, { cpf ,date_birth }:LoginUserDto ): Promise<Either<AppError , TokenType >> => {
    try{
        const result = await api.post('/auth/services' , { cpf , date_birth })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}