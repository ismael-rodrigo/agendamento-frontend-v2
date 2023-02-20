import { createContext, Dispatch, SetStateAction } from "react";
import { ZodError } from "zod";
import { UserType } from "../types/entities/User";
import { newScheduleHandler, Page } from "../use-case/NewSchedule";


export const ScheduleContext = createContext<ScheduleHandlerInterface | null>(null)




export interface ScheduleHandlerInterface {
    page:Page
    setPage:Dispatch<SetStateAction<Page>>
    setUserHandler: (user: UserType) => ZodError<UserType> | null
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