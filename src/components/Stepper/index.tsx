import { CheckOutlined, HourglassOutlined, ScheduleOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import {   Col, Divider, Row, Steps  } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useContext, useRef } from 'react';
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
              status: handler?.schedule.page.register_user=='process'?'process':handler?.schedule.page.login,
              icon: <UserOutlined />,
            },
            {
              title: 'Serviços',
              status: handler?.schedule.page.service,
              icon: <SolutionOutlined />,
            },
            {
              title: 'Horários',
              status: handler?.schedule.page.dates,
              icon: <HourglassOutlined />,
            },
            {
              title: 'Confirmação',
              status: handler?.schedule.page.confirm,
              icon: <ScheduleOutlined />,
            },
            {
              title: 'Concluído',
              status: handler?.schedule.page.finish,
              icon: <CheckOutlined />,
            },
          ]}
        />
      <Divider dashed />

      <Row>
        <Col span={24}> 
          {handler?.schedule.page.login=='process' && <LoginStep/>}
          {handler?.schedule.page.register_user=='process' && <CreateAccount params={{}}/>}
          {handler?.schedule.page.service=='process' && <SelectService/>}
          {handler?.schedule.page.dates=='process' && <StaticDatePicker/>}
          {handler?.schedule.page.confirm=='process' && <ConfirmPage/>}
          {handler?.schedule.page.finish=='finish' &&  <FinishedSchedule/> }
        </Col>  
      </Row>
      
    </Col>


)}

export default StepperContainer;