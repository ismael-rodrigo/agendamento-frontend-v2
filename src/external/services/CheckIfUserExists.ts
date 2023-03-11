import { UserType } from './../../types/entities/User';
import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface CheckUserRequest {
    cpf:string
}

export type LoginResponse = {
    status:'ok'
}

export const checkIfUserAlreadyExists = async ( api:AxiosInstance, { cpf  }:CheckUserRequest ): Promise<Either<AppError , LoginResponse >> => {
    try{
        const result = await api.get('/user' , { params:{ cpf } })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status , type:error.response?.data.type}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}