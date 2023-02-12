import { createContext, Dispatch, SetStateAction } from "react";
import { AppError } from "../error/AppError";
import { Either } from "../error/Either";
import { DateAvailable } from "../types/DateAvailable";
import { Hours } from "../types/HourAvailable";
import { LocationType } from "../types/Locations";
import { ServiceType } from "../types/Services";
import { CreateUserDto } from "../use-case/CreateUser";
import { LoginUserDto } from "../use-case/LoginUser";
import { newScheduleHandler, Page } from "../use-case/NewSchedule";
import { FindDatesAvailable } from "../use-case/NewSchedule/FindDatesAvailable";
import { FindHoursAvailable } from "../use-case/NewSchedule/FindHoursAvailable";
import { FindServiceOfLocation } from "../use-case/NewSchedule/FindServicesOfLocation";


export const ScheduleContext = createContext<ScheduleHandlerInterface | null>(null)




export interface ScheduleHandlerInterface{
    page:Page
    setPage:Dispatch<SetStateAction<Page>>
    loginHandler: (params: LoginUserDto) => Promise<void>;
    createUserHandler: (params: CreateUserDto) => Promise<void>;
    findLocations: () => Promise <LocationType[]>;
    findServices: ({ location_id }: FindServiceOfLocation) =>Promise<ServiceType[]>;
    findDates: ({ service_id }: FindDatesAvailable) => Promise<DateAvailable[]>;
    findHours: ({}: FindHoursAvailable) => Promise<Hours[]>;
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