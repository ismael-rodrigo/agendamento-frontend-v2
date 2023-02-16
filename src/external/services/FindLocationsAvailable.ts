import { LocationType } from '../../types/Locations';
import { AppError } from '../../error/AppError';
import { Either, Left, Right } from '../../error/Either';
import { AxiosError, AxiosInstance } from 'axios';




export const findLocationsAvailable = async (api:AxiosInstance): Promise<Either<AppError , LocationType[]>> => {
    try{
        const result = await api.post('/schedule/locations')
        return Right.create( result.data as LocationType[] )
    }
    catch ( error ){
        if(error instanceof AxiosError){
            return Left.create( AppError.create({ message:error.message , title:error.name}) )
        }
        return Left.create( AppError.create({ message:'Internal error' , title:'Error'}) )
    }
}