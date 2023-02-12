import StepperContainer from "../components/Stepper";
import { ScheduleContextProvider } from "../context/NewScheduleContext";

export default function SchedulePage(){

    return(
    <>
        <ScheduleContextProvider >
            <StepperContainer/>
            <br />
            <br />
        </ScheduleContextProvider>

    </>)


}