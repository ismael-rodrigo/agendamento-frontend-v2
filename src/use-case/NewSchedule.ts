import { userSchema } from './../types/entities/User';
import { LocationType } from './../types/entities/Locations';
import { useState } from 'react';
import { ServiceType } from '../types/entities/Services';
import { UserType} from '../types/entities/User';
import { HourType } from '../types/entities/HourAvailable';


export type Page = 'login' | 'create-account' | 'service' | 'dates-available' | 'confirm' | 'schedule-finish'

export type ScheduleData = {
    user:UserType | null | undefined
    service:ServiceType | null | undefined
    location:LocationType | null | undefined
    date:Date | null | undefined
    hour:HourType | null | undefined
}

export const newScheduleHandler = () =>{
    const [page, setPage] = useState<Page>('dates-available')

    const [user, setUser] = useState<UserType | null>()
    const [serviceLocation ,setServiceLocation] = useState<{service:ServiceType ,location:LocationType} | null>()
    const [dateTime , setDateTime] = useState<{date:Date , hour:HourType} | null>()

    const setUserHandler = (user:UserType) => {
        const validation = userSchema.safeParse(user)
        if(!validation.success){
            console.log(validation.error)
            return validation.error
        }
        setUser(user)
        setPage('service')
    }

    const setServiceAndLocationHandler = (service:ServiceType , location:LocationType) =>{
        setServiceLocation({service , location})
        setPage('dates-available')
    }

    const setDateAndTimeHandler = (date:Date , time:HourType)=>{
        console.log(date,time)
        setDateTime({
            date:date,
            hour:time
        })
        setPage('confirm')
    }

    const scheduleData:ScheduleData = {
        date:dateTime?.date,
        user:user,
        location:serviceLocation?.location,
        service:serviceLocation?.service,
        hour:dateTime?.hour
    }


    return {
        page,
        setPage,
        setUserHandler,
        setServiceAndLocationHandler,
        setDateAndTimeHandler,

        scheduleData
    }
}