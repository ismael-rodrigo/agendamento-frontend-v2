import { DateAvailable } from '../../types/entities/DateAvailable';
import { AppError } from '../../error/AppError';
import { Either, Left, Right } from '../../error/Either';
import { AxiosError, AxiosInstance } from 'axios';


export type FindDatesAvailable = {
    service_id:string
}

export const findDatesAvailable = async (  api:AxiosInstance , { service_id }:FindDatesAvailable ): Promise<Either<AppError , DateAvailable[]>> => {
    try{
        const result = await api.get('/schedule/dates-available' , { params: { service_id } })
        return Right.create(result.data)
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }

}