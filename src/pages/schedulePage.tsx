import AuthenticatedSchedule from "../components/Stepper/AuthenticatedSchedule";
import { ScheduleContextProvider } from "../context/NewScheduleContext";

export default function SchedulePage(){

    return(
    <>
        <ScheduleContextProvider >
            <AuthenticatedSchedule/>
            <br />
            <br />
        </ScheduleContextProvider>

    </>)


}