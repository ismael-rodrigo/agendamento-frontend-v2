import { userSchema } from './../types/entities/User';
import { LocationType } from './../types/entities/Locations';
import { useState } from 'react';
import { ServiceType } from '../types/entities/Services';
import { UserType} from '../types/entities/User';
import { HourType } from '../types/entities/HourAvailable';
import { Backend } from '../external/api';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';



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


    const [api, contextHolder] = notification.useNotification();

    const setUserHandler = (user:UserType) => {
        const validation = userSchema.safeParse(user)
        if(!validation.success){
            console.log(validation.error)
            return validation.error
        }
        setUser(user)
        setPage({...page ,register_user:'finish' , service:'process'})
    }

    const setServiceAndLocationHandler = (service:ServiceType , location:LocationType) =>{
        setServiceLocation({service , location})
        setPage({...page , service:'finish' , dates:'process'})
    }

    const setDateAndTimeHandler = (date:Date , time:HourType)=>{
        console.log(date,time)
        setDateTime({
            date:date,
            hour:time
        })
        setPage({...page , dates:'finish' , confirm:'process'})
    }

    const submitSchedule = async () => {
        if( !dateTime || !serviceLocation || !user) return
        console.log(user )
        const params = {
            date:dateTime.date,
            hour_id:dateTime.hour.id,
            service_id:serviceLocation.service.id,
            user_id:user.id
        }
        const result = await Backend.createSchedule(params)
        console.log(result)
        if(result.isLeft()){
            
            return
        }
        api.open({
            message: 'Agendamento realizado com sucesso !',
            description:
              'Em breve voce recebera um email com todas as informações necessárias para o seu atendimento. Email enviado para '+ user.email,
          })
          
        setPage({...page , confirm:'finish' , finish:'finish'})
    }

    const loginSuccess = (user:UserType)=> {
        setUser(user)
        setPage({...defaultPage , login:'finish' , register_user:'finish' , service:'process'})
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
        setUserHandler,
        setServiceAndLocationHandler,
        setDateAndTimeHandler,
        submitSchedule,

        scheduleData
    }
}