import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface CreateUserDto {
    cpf:string
    name:string
    monther_name:string
    phone_number:string
    date_birth:Date
}


export const createUserService = async ( api:AxiosInstance, { cpf , date_birth , monther_name , name , phone_number } :CreateUserDto ): Promise<Either<AppError , TokenType >> => {
    try{
        const result = await api.post('/schedule/create-account' , { cpf , date_birth , monther_name , name , phone_number })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}
