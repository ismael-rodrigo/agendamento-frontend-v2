import { userSchema } from './../types/entities/User';
import { LocationType } from './../types/entities/Locations';
import { useState } from 'react';
import { ServiceType } from '../types/entities/Services';
import { UserType} from '../types/entities/User';
import { HourType } from '../types/entities/HourAvailable';



export type Page = 'login' | 'create-account' | 'service' | 'dates-available' | 'confirm' | 'schedule-finish'











export const newScheduleHandler = () =>{
    const [page, setPage] = useState<Page>('login')

    const [user, setUser] = useState<UserType | null>()

    const setUserHandler = (user:UserType) => {
        const validation = userSchema.safeParse(user)
        
        if(!validation.success){
            return validation.error
        }
        return null
    }

    const setServiceAndLocationHandler = (service:ServiceType , location:LocationType) =>{

    }

    const setDateAndTimeHandler = (date:Date , time:HourType)=>{

    }

    


    return {
        page,
        setPage,
        setUserHandler
    }
}