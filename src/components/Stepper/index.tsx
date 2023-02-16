import { CheckOutlined, HourglassOutlined, ScheduleOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import {  Col, Divider, Row, Steps  } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useContext, useRef, useState } from 'react';
import { ScheduleContext } from '../../context/NewScheduleContext';
import CreateAccount from './Steps/CreateAccount';
import LoginStep from './Steps/Login';
import StaticDatePicker from './Steps/SelectDateAndHour';
import SelectService from './Steps/SelectService';

const StepperContainer = () => {

  const refs = useRef<CarouselRef>(null)
  const handler = useContext(ScheduleContext)


  return(

    <Col style={{width:'100%' , margin:'auto'}}>

        <Steps
          items={[
            {
              title: 'Login',
              status: handler?.page =='login' || handler?.page =='create-account' ? 'process':'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Serviços',
              status: handler?.page =='service'?'process': 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Horários',
              status: handler?.page =='dates-available' ?'process': 'finish',
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
          {handler?.page=='login' && <LoginStep />}
          {handler?.page=='create-account' && <CreateAccount params={{}}/>}
          {handler?.page=='service' && <SelectService />} 
          {handler?.page=='dates-available' && <StaticDatePicker service_id='05a13dcc-9e93-4dc3-abae-9f7368b52b9b' />}
        </Col>
      </Row>
      
    </Col>


)}

export default StepperContainer;