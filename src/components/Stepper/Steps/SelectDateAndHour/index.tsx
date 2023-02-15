import {  HoursAvailableContainer } from "./hoursAvailableContainer";
import { Button,  Col, Row } from "antd";
import { DateAvailableContainer } from "./dateAvailableContainer";
import { useEffect, useState } from "react";
import { Hours } from "../../../../types/HourAvailable";
import { Backend } from "../../../../external/api";
import { DateAvailable } from "../../../../types/DateAvailable";


const App = ( { service_id }:{service_id:string}) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(null)
  const [hourSelected , setHourSelected] = useState<Hours | null>(null)

  const [dateAvailable ,setDateAvailable] = useState<DateAvailable[]>([] as DateAvailable[])
  const [hoursAvailable, setHoursAvailable ] = useState<Hours[]>([] as Hours[])



  useEffect(()=>{
    Backend.findDates({service_id}).then((result)=>{
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
      }).then((result)=>{
        if(result.isLeft()) return
        setHoursAvailable(result.value.hours)
      }).catch((err)=>{
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

        <Button disabled={ !dateSelected || !hourSelected } type="primary" onClick={()=>console.log(hourSelected , dateSelected)}   >
            Confirmar 
        </Button>
      
        </Col>
    </Row>

    </>
  );
};

export default App;