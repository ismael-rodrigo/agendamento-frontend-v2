import { DateAvailable } from '../../types/DateAvailable';
import { AppError } from '../../error/AppError';
import { Either, Left, Right } from '../../error/Either';
import { AxiosInstance } from 'axios';


export type FindDatesAvailable = {
    service_id:string
}

export const findDatesAvailable = async (  api:AxiosInstance , { service_id }:FindDatesAvailable ): Promise<Either<AppError , DateAvailable[]>> => {
    try{
        //const result = await api.get('url:findLocationsAvailable')
        return Right.create( [] as DateAvailable[] )
    }
    catch ( error ){
        return Left.create( AppError.create({message:'Error desconhecido!' , title:'Error'}) )
    }

}