import {  HoursAvailableContainer } from "./hoursAvailableContainer";
import { Button,  Col, Row } from "antd";
import { DateAvailableContainer } from "./dateAvailableContainer";
import { datesAvailablesData } from "./dateAvailableContainer/data";
import { useEffect, useState } from "react";
import { Hours } from "../../../../types/HourAvailable";


const App = ( { service_id }:{service_id:string}) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(null)
  const [hourSelected , setHourSelected] = useState<Hours | null>(null)

  useEffect(()=>{
    console.log(dateSelected , hourSelected)
  },[dateSelected , hourSelected])

  return (
    <>
    <Row gutter={[20, 20]} wrap>
      <Col flex='auto' style={{maxWidth:500}}>
        <DateAvailableContainer setDateSelected={ setDateSelected } datesAvailable={ datesAvailablesData }/>
      </Col>
      <Col flex='auto' >
        <HoursAvailableContainer setHourSelected={setHourSelected}   />
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

        <Button type="primary" htmlType="submit"   >
            Confirmar 
        </Button>
      
        </Col>
    </Row>

    </>
  );
};

export default App;