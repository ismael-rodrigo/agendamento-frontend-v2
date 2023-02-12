import { LocationType } from '../../types/Locations';
import { AppError } from '../../error/AppError';
import { Either, Left, Right } from '../../error/Either';
import { AxiosInstance } from 'axios';




export const findLocationsAvailable = async (api:AxiosInstance): Promise<Either<AppError , LocationType[]>> => {
    try{
        //const result = await api.get('url:findLocationsAvailable')
        return Right.create( [] as LocationType[] )
    }
    catch ( error ){
        return Left.create( AppError.create({message:'Error desconhecido!' , title:'Error'}) )
    }

}