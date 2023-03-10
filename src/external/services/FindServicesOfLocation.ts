import { ServiceType } from '../../types/entities/Services';
import { AppError } from '../../error/AppError';
import { Either, Left, Right } from '../../error/Either';
import { AxiosError, AxiosInstance } from 'axios';

export interface FindServiceOfLocation {
    location_id:string
   
}

export const findServicesOfLocation = async ( api:AxiosInstance, { location_id }:FindServiceOfLocation ): Promise<Either<AppError , ServiceType[]>> => {
    try{
        const result = await api.get('/schedule/services' , {
            params:{
                location_id
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