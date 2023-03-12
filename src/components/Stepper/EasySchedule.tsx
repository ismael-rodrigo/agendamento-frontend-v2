import { CheckOutlined, HourglassOutlined, ScheduleOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons"
import { Col, Divider, Row, Steps } from "antd"
import { useContext } from "react"
import { ScheduleContext } from "../../context/NewScheduleContext"
import SelectService from "./Steps/SelectService"
import StaticDatePicker from './Steps/SelectDateAndHour';
import { ConfirmPage } from "./Steps/ConfirmPage"
import { FinishedSchedule } from "./Steps/FinishedSchedule"
import { SetUnauthenticatedUserStep } from "./Steps/SetUnauthenticatedUser"

export const EasyScheduleStepper = () => {
    
    const handler = useContext(ScheduleContext)

    
    return(

        <Col style={{width:'100%' , margin:'auto'}}>
    
            <Steps
              items={[
                {
                  title: 'Dados',
                  status: handler?.schedule.page.login,
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
                {handler?.schedule.page.login=='process' && <SetUnauthenticatedUserStep/>}
                {handler?.schedule.page.service=='process' && <SelectService/>}
                {handler?.schedule.page.dates=='process' && <StaticDatePicker/>}
                {handler?.schedule.page.confirm=='process' && <ConfirmPage/>}
                {handler?.schedule.page.finish=='finish' &&  <FinishedSchedule/> }
            </Col>  
          </Row>
          
        </Col>
    
    
    )
}