import {  HoursAvailableContainer } from "./hoursAvailableContainer";
import { Button,  Col, Row } from "antd";
import { DateAvailableContainer } from "./dateAvailableContainer";
import { useContext, useEffect, useState } from "react";
import { HourType } from "../../../../types/entities/HourAvailable";
import { Backend } from "../../../../external/api";
import { DateAvailable } from "../../../../types/entities/DateAvailable";
import { ScheduleContext } from "../../../../context/NewScheduleContext";


const App = () => {
  const [dateSelected, setDateSelected] = useState<Date | null>(null)
  const [hourSelected , setHourSelected] = useState<HourType | null>(null)

  const [dateAvailable ,setDateAvailable] = useState<DateAvailable[]>([] as DateAvailable[])
  const [hoursAvailable, setHoursAvailable ] = useState<HourType[]>([] as HourType[])

  const handler = useContext(ScheduleContext)
  const service_id = 'd98043d2-3178-4983-917d-1f6a7b122c56'


  const submitHandler = (date:Date , hour:HourType ) => {
    console.log(handler?.scheduleData)
    handler?.setPage('login')

  }



  useEffect(()=>{

    Backend.findDates({service_id})
    .then((result)=>{
      if(result.isLeft())return
      setDateAvailable(result.value)
    })

  },[])


  useEffect(()=>{
    setHourSelected(null)

    if(dateSelected){

      Backend.findHours({
        date:dateSelected,
        service_id:service_id
      })
      .then((result)=>{
        if(result.isLeft()) return
        setHoursAvailable(result.value.hours)
      })
      .catch((err)=>{
        console.log(err)
      })

    }
  },[dateSelected])

  return (
    <>
    <Row gutter={[20, 20]} wrap>
      <Col flex='auto' style={{maxWidth:500}}>
        {dateAvailable.length >0 &&
        <DateAvailableContainer setDateSelected={ setDateSelected } datesAvailable={ dateAvailable }/>
        }
      </Col>
      <Col flex='auto' >
        {hoursAvailable &&
        <HoursAvailableContainer hours={hoursAvailable} setHourSelected={setHourSelected}   />
        }
      </Col>
    </Row>

    
    <br />
    <br />
    <Row>

        <Col flex='none'   >
          <Button type="dashed" >
              Voltar 
          </Button> 
        </Col>
        <Col flex='auto'/>
         
        <Col flex='none' >

        <Button disabled={ !dateSelected || !hourSelected } type="primary" onClick={()=>dateSelected && hourSelected && submitHandler(dateSelected , hourSelected)}   >
            Confirmar 
        </Button>
      
        </Col>
    </Row>

    </>
  );
};

export default App;