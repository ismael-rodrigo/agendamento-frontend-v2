import { TokenType } from './../../types/Token';
import { AxiosError, AxiosInstance } from "axios"
import { AppError } from "../../error/AppError"
import { Either, Left, Right } from "../../error/Either"
import { UnauthenticatedUserType } from '../../types/entities/UnauthenticatedUser';

export interface CreateNewScheduleDTO {
    service_id: string
	date: Date
	hour_id: string
	user_id: string
}

export interface CreateNewEasyScheduleDTO {
    service_id: string
	date: Date
	hour_id: string
	user: UnauthenticatedUserType
}

export const createNewSchedule = async ( api:AxiosInstance, { date , hour_id , service_id , user_id }:CreateNewScheduleDTO ): Promise<Either<AppError , TokenType >> => {
    try{    
        const result = await api.post(`user/schedule` , { date , hour_id , service_id } , {
            headers:{
                Authorization: 'Bearer '+ window.localStorage.getItem('token@access')
            }
        })

        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status , type:error.response?.data.type}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}

export const createNewEasySchedule = async ( api:AxiosInstance, { date , hour_id , service_id , user }:CreateNewEasyScheduleDTO ): Promise<Either<AppError , TokenType >> => {
    try{    
        const result = await api.post(`schedule/unauthenticated-schedule` , { date , hour_id , service_id , user })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status , type:error.response?.data.type}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}