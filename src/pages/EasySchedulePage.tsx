import { EasyScheduleStepper } from "../components/Stepper/EasySchedule";
import { ScheduleContextProvider } from "../context/NewScheduleContext";

export default function EasySchedulePage(){

    return(
    <>
        <ScheduleContextProvider >
            <EasyScheduleStepper/>
            <br />
            <br />
        </ScheduleContextProvider>

    </>)


}