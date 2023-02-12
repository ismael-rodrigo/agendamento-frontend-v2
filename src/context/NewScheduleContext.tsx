import { createContext, Dispatch, SetStateAction } from "react";
import { AppError } from "../error/AppError";
import { Either } from "../error/Either";
import { DateAvailable } from "../types/DateAvailable";
import { Hours } from "../types/HourAvailable";
import { LocationType } from "../types/Locations";
import { ServiceType } from "../types/Services";
import { CreateUserDto } from "../external/services/CreateUser";
import { LoginUserDto } from "../external/services/LoginUser";
import { newScheduleHandler, Page } from "../use-case/NewSchedule";
import { FindDatesAvailable } from "../external/services/FindDatesAvailable";
import { FindHoursAvailable } from "../external/services/FindHoursAvailable";
import { FindServiceOfLocation } from "../external/services/FindServicesOfLocation";


export const ScheduleContext = createContext<ScheduleHandlerInterface | null>(null)




export interface ScheduleHandlerInterface{
    page:Page
    setPage:Dispatch<SetStateAction<Page>>
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