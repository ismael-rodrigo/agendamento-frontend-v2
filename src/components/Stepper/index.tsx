import { CalendarOutlined, CheckOutlined, HourglassOutlined, InfoCircleOutlined, LoadingOutlined, ScheduleOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Divider, Input, Row, Space, Steps, Tooltip } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
import CreateAccount from './Steps/CreateAccount';
import LoginStep from './Steps/Login';
import StaticDatePicker from './Steps/SelectDateAndHour';
import SelectService from './Steps/SelectService';

const StepperContainer = () => {

  const refs = useRef<CarouselRef>(null)
  const [page,setPage]= useState(3)


  return(

    <Col style={{width:'100%' , margin:'auto'}}>

        <Steps
          items={[
            {
              title: 'Login',
              status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Serviços',
              status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Horários',
              status: 'process',
              icon: <HourglassOutlined />,
            },
            {
              title: 'Confirmação',
              status: 'wait',
              icon: <ScheduleOutlined />,
            },
            {
              title: 'Concluído',
              status: 'wait',
              icon: <CheckOutlined />,
            },
          ]}
        />
      <Divider dashed />

      <Row>
        <Col span={24}> 
          {page==0 && <LoginStep />}
          {page==1 && <CreateAccount params={{}}/>}
          {page==2 && <SelectService />}
          {page==3 && <StaticDatePicker/>}
        </Col>
      </Row>
      
    </Col>


)}

export default StepperContainer;