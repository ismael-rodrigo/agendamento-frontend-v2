import { HourType } from '../../types/entities/HourAvailable';
import { AppError } from '../../error/AppError';
import { Either, Left, Right } from '../../error/Either';
import { AxiosError, AxiosInstance } from 'axios';


export type FindHoursAvailable = {
    service_id:string
    date:Date
}

export type findHoursAvailableResponse = {date:Date , hours:HourType[]}


export const findHoursAvailable = async ( api:AxiosInstance , {service_id , date}:FindHoursAvailable ): Promise<Either<AppError ,findHoursAvailableResponse >> => {
    try{
        const result = await api.get('/schedule/hours-available' , { params:{ service_id , date} })
        return Right.create( result.data )
    }
    catch ( error ){

        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name , statusCode:error.status}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }

}