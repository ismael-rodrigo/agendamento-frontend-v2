import { Hours } from '../../types/HourAvailable';
import { AppError } from './../../error/AppError';
import { Either, Left, Right } from './../../error/Either';


export type FindHoursAvailable = {
    service_id:string
    date:Date
}

export const findHoursAvailable = async ( {}:FindHoursAvailable ): Promise<Either<AppError , Hours[]>> => {
    try{
        //const result = await api.get('url:findLocationsAvailable')
        return Right.create( [] as Hours[] )
    }
    catch ( error ){
        return Left.create( AppError.create({message:'Error desconhecido!' , title:'Error'}) )
    }

}