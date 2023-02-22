import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"

export interface CreateNewScheduleDTO {
    service_id: string
	date: Date
	hour_id: string
	user_id: string
}


export const createNewSchedule = async ( api:AxiosInstance, { date , hour_id , service_id , user_id }:CreateNewScheduleDTO ): Promise<Either<AppError , TokenType >> => {
    try{
        const result = await api.post('/schedule/create' , { date , hour_id , service_id , user_id })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            console.log(error.response?.data)
            return Left.create( AppError.create({ message:error.message , title:error.name}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}