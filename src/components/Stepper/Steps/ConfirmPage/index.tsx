import { useContext } from 'react';
import { Button, Col, Descriptions, notification, Row } from 'antd';
import { ScheduleContext } from '../../../../context/NewScheduleContext';

const ConfirmPage = () => {
  const [api, contextHolder] = notification.useNotification();

  const handler = useContext(ScheduleContext)
  
  const handlerSubmit = async ()=> {
    const result = await handler?.schedule.submitSchedule()
    if(result?.isLeft()){
      api['error']({
        message: 'Não foi possível realizar o agendamento.',
        description:
          'Por motivos desconhecidos não foi possível realizar o agendamento, tente novamente mais tarde ou tente comunicar o suporte técnico.',
      });
      return
    }

    api['success']({
      message: 'Agendamento concluído com sucesso !',
      description:
        `Agendamento realizado com sucesso. Um email será enviado para ${handler?.schedule.scheduleData.user?.email} com as informações importantes para o seu atendimento.`,
    });
  }

  return(
  <Col>
    <Descriptions title="Confirme os dados do agendamento">
    <Descriptions.Item label="Nome">{handler?.schedule.scheduleData.user?.name}</Descriptions.Item>
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
          <Button type="primary" onClick={()=>{
            handlerSubmit()
            }} >
              Avançar 
          </Button>
      </Col>
    </Row>
  </Col>
  
)};

export {ConfirmPage};