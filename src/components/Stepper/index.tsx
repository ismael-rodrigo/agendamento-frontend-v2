import { CheckOutlined, HourglassOutlined, ScheduleOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import {  Col, Divider, Row, Steps  } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useContext, useRef, useState } from 'react';
import { ScheduleContext } from '../../context/NewScheduleContext';

import {ConfirmPage} from './Steps/ConfirmPage';
import CreateAccount from './Steps/RegisterUser/RegisterUserForm';
import LoginStep from './Steps/Login';
import StaticDatePicker from './Steps/SelectDateAndHour';
import SelectService from './Steps/SelectService';
import { FinishedSchedule } from './Steps/FinishedSchedule';

const StepperContainer = () => {

  const refs = useRef<CarouselRef>(null)
  const handler = useContext(ScheduleContext)


  return(

    <Col style={{width:'100%' , margin:'auto'}}>

        <Steps
          items={[
            {
              title: 'Login',
              status: handler?.page.login,
              icon: <UserOutlined />,
            },
            {
              title: 'Serviços',
              status: handler?.page.service,
              icon: <SolutionOutlined />,
            },
            {
              title: 'Horários',
              status: handler?.page.dates,
              icon: <HourglassOutlined />,
            },
            {
              title: 'Confirmação',
              status: handler?.page.confirm,
              icon: <ScheduleOutlined />,
            },
            {
              title: 'Concluído',
              status: handler?.page.confirm,
              icon: <CheckOutlined />,
            },
          ]}
        />
      <Divider dashed />

      <Row>
        <Col span={24}> 
          {handler?.page.login=='process' && <LoginStep/>}
          {handler?.page.register_user=='process' && <CreateAccount params={{}}/>}
          {handler?.page.service=='process' && <SelectService/>}
          {handler?.page.dates=='process' && <StaticDatePicker/>}
          {handler?.page.confirm=='process' && <ConfirmPage/>}
          {handler?.page.finish=='finish' &&  <FinishedSchedule/> }

        </Col>  
      </Row>
      
    </Col>


)}

export default StepperContainer;