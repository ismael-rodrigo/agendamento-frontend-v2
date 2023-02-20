import { createContext, Dispatch, SetStateAction } from "react";
import { ZodError } from "zod";
import { HourType } from "../types/entities/HourAvailable";
import { LocationType } from "../types/entities/Locations";
import { ServiceType } from "../types/entities/Services";
import { UserType } from "../types/entities/User";
import { newScheduleHandler, Page, ScheduleData } from "../use-case/NewSchedule";


export const ScheduleContext = createContext<ScheduleHandlerInterface | null>(null)




export interface ScheduleHandlerInterface {
    page:Page
    setPage:Dispatch<SetStateAction<Page>>
    setUserHandler: (user: UserType) => ZodError<UserType> | undefined
    setServiceAndLocationHandler:(service:ServiceType , location:LocationType) => void
    setDateAndTimeHandler:(date:Date , time:HourType) => void
    scheduleData:ScheduleData
}





export const ScheduleContextProvider = ({children}:any)=>{

    const scheduleHandler = newScheduleHandler()

    return (
    <>
        <ScheduleContext.Provider value={scheduleHandler}>
            {children}
        </ScheduleContext.Provider>
    </>)
}