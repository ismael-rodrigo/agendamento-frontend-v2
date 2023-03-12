import { useContext, useState } from 'react';
import { Button, Col, Descriptions, notification, Row } from 'antd';
import { ScheduleContext } from '../../../../context/NewScheduleContext';
import { getInternalError } from '../../../../error/internalErrors/errors-bundles-pt-br';
import { generalContext } from '../../../../context/GeneralContext';



const ConfirmPage = () => {
  const handler = useContext(ScheduleContext)
  const feedback = useContext(generalContext)
  const [loading,setLoading] = useState(false)
  const currentUser = handler?.schedule.scheduleData.user ||  handler?.schedule.scheduleData.unUser
  
  const handlerSubmit = async ()=> {
    setLoading(true)
    const result = await handler?.schedule.submitSchedule()

    if(result?.isRight()){
      return
    }

    if(result?.isLeft()){
      const internalError = getInternalError(result.error.type)
      feedback?.notification['error']({
        placement:'topLeft',
        message: internalError.title,
        description:internalError.message,
        duration:10
      });
      handler?.schedule.setPageWithName(internalError.redirectTo)
      return
    }
  }

  return(
  <Col>
    <Descriptions title="Confirme os dados do agendamento">
    <Descriptions.Item label="Nome">{currentUser?.name}</Descriptions.Item>
    <Descriptions.Item label="Local">{handler?.schedule.scheduleData.location?.address}</Descriptions.Item>
    <Descriptions.Item label="Serviço">{handler?.schedule.scheduleData.service?.service_name}</Descriptions.Item>
    <Descriptions.Item label="Data">{handler?.schedule.scheduleData.date?.toLocaleDateString()}</Descriptions.Item>
    <Descriptions.Item label="Horário">
      {handler?.schedule.scheduleData.hour?.hour}:{handler?.schedule.scheduleData.hour?.minutes} 
    </Descriptions.Item>
    </Descriptions>
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
          <Button 
          type="primary" 
          loading={loading}
          onClick={()=>{
            handlerSubmit()
            }} >
              Avançar 
          </Button>
      </Col>
    </Row>
  </Col>
  
)};

export {ConfirmPage};