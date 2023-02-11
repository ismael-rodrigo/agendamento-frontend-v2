import { HoursAvailableContainer } from "./hoursAvailableContainer";
import { hoursAv } from "./hoursAvailableContainer/data";
import { Button,  Col, Row } from "antd";
import { DateAvailableContainer } from "./dateAvailableContainer";


const App = () => {
  return (
    <>
    <Row gutter={[20, 20]} wrap>
      <Col flex='auto' style={{maxWidth:500}}>
        <DateAvailableContainer/>
      </Col>
      <Col flex='auto' >
        <HoursAvailableContainer hours={hoursAv} />
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