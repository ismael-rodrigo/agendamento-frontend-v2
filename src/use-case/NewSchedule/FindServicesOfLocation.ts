import { ServiceType } from '../../types/Services';
import { AppError } from './../../error/AppError';
import { Either, Left, Right } from './../../error/Either';

export interface FindServiceOfLocation {
    location_id:string
}

export const findServicesOfLocation = async ( { location_id }:FindServiceOfLocation ): Promise<Either<AppError , ServiceType[]>> => {
    try{
        //const result = await api.get('url:findServicesOfLocation')
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(Right.create( [] as ServiceType[] ))
            },2000)
        })
    }
    catch ( error ){
        return Left.create( AppError.create({message:'Error desconhecido!' , title:'Error'}) )
    }

}