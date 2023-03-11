import { message , notification } from "antd";
import { MessageInstance  } from "antd/es/message/interface";
import {  NotificationInstance } from "antd/es/notification/interface";
import { createContext, Dispatch, SetStateAction } from "react";
import { ZodError } from "zod";
import { AppError } from "../error/AppError";
import { Left, Right } from "../error/Either";
import { HourType } from "../types/entities/HourAvailable";
import { LocationType } from "../types/entities/Locations";
import { ServiceType } from "../types/entities/Services";
import { UserType } from "../types/entities/User";
import { TokenType } from "../types/Token";
import { newScheduleHandler, Page, ScheduleData } from "../use-case/NewSchedule";


export const ScheduleContext = createContext<{
    schedule:ScheduleHandlerInterface
} | null>(null)




export interface ScheduleHandlerInterface {
    page:Page
    setPage:Dispatch<SetStateAction<Page>>
    loginSuccess:(user:UserType , token:TokenType)=>void
    setServiceAndLocationHandler:(service:ServiceType , location:LocationType) => void
    setDateAndTimeHandler:(date:Date , time:HourType) => void
    submitSchedule:()=>Promise<Left<AppError> | Right<string> | undefined>,
    userNotExists: (cpf:string)=>void,
    setPageWithName :(pageName?:string)=>void,
    scheduleData:ScheduleData
    cpf:string
}





export const ScheduleContextProvider = ({children}:any)=>{

    const scheduleHandler = newScheduleHandler()

    return (
    <>
        <ScheduleContext.Provider value={{
            schedule:scheduleHandler,
        }}>
            {children}
        </ScheduleContext.Provider>
    </>)
}