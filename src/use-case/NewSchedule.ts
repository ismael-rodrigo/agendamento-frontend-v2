import { TokenType } from './../types/Token';
import { userSchema } from './../types/entities/User';
import { LocationType } from './../types/entities/Locations';
import { useState } from 'react';
import { ServiceType } from '../types/entities/Services';
import { UserType} from '../types/entities/User';
import { HourType } from '../types/entities/HourAvailable';
import { Backend } from '../external/api';
import { Left, Right } from '../error/Either';




type StatusPage = "error" | "process" | "finish" | "wait" | undefined


export type Page = {
    login:StatusPage 
    register_user:StatusPage
    service:StatusPage
    dates:StatusPage
    confirm:StatusPage
    finish:StatusPage
}


export type ScheduleData = {
    user:UserType | null | undefined
    service:ServiceType | null | undefined
    location:LocationType | null | undefined
    date:Date | null | undefined
    hour:HourType | null | undefined
}

const defaultPage:Page = {
    login:'process',
    register_user:'wait',
    service:'wait',
    dates:'wait',
    confirm:'wait',
    finish:'wait'
}



export const newScheduleHandler = () =>{
    const [page, setPage] = useState<Page>(defaultPage)

    const [user, setUser] = useState<UserType | null>()
    const [serviceLocation ,setServiceLocation] = useState<{service:ServiceType ,location:LocationType} | null>()
    const [dateTime , setDateTime] = useState<{date:Date , hour:HourType} | null>()
    const [cpf , setCpf] = useState('')


    const setServiceAndLocationHandler = (service:ServiceType , location:LocationType) =>{
        setServiceLocation({service , location})
        setPage({...page , service:'finish' , dates:'process'})
    }

    const setDateAndTimeHandler = (date:Date , time:HourType)=>{
        setDateTime({
            date:date,
            hour:time
        })
        setPage({...page , dates:'finish' , confirm:'process'})
    }

    const submitSchedule = async () => {
        if( !dateTime || !serviceLocation || !user) return
        const params = {
            date:dateTime.date,
            hour_id:dateTime.hour.id,
            service_id:serviceLocation.service.id,
            user_id:user.id
        }
        const result = await Backend.createSchedule(params)
        if(result.isRight()){  
            setPage({...page , confirm:'finish' , finish:'finish'})
            return Right.create('success')
        }
        return Left.create(result.error)
    }

    const loginSuccess = (user:UserType , token:TokenType)=> {
        setUser(user)
        setPage({...defaultPage , login:'finish' , register_user:'finish' , service:'process'})
    }

    const userNotExists = (cpf:string)=> {
        setCpf(cpf)
        setPage({...defaultPage , login:'finish' , register_user:'process'})
    }



    const setPageWithName = (pageName?:string)=>{
        if(!pageName) return
        setPage({
            login: pageName=='login'?'process':'wait',
            register_user: pageName=='register_user'? 'process':'wait',
            service: pageName=='service'? 'process':'wait',
            dates: pageName=='dates'? 'process':'wait',
            confirm: pageName=='confirm'? 'process':'wait',
            finish: pageName=='finish'? 'process':'wait',
        })
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
        loginSuccess,
        setServiceAndLocationHandler,
        setDateAndTimeHandler,
        submitSchedule,
        userNotExists,
        setPageWithName,

        scheduleData,
        cpf
    }
}