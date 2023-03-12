import { Button, Descriptions, Result } from "antd"
import { useContext } from "react"
import { ScheduleContext } from "../../../../context/NewScheduleContext"

export const FinishedSchedule = () => {

  const handler = useContext(ScheduleContext)
  
  const currentUser = handler?.schedule.scheduleData.user ||  handler?.schedule.scheduleData.unUser


  return (<>
    <Result
    status="success"
    title="Agendamento Finalizado com Sucesso !"
    subTitle={handler?.schedule.scheduleData.user?.email && `Um email foi enviado para ${handler?.schedule.scheduleData.user?.email} com dados importantes sobre o seu agendamento.` }
    extra={[

      <Descriptions bordered title="Informações do agendamento">
      <Descriptions.Item label="Nome">{currentUser?.name}</Descriptions.Item>
      <Descriptions.Item label="Local">{handler?.schedule.scheduleData.location?.address}</Descriptions.Item>
      <Descriptions.Item label="Serviço">{handler?.schedule.scheduleData.service?.service_name}</Descriptions.Item>
      <Descriptions.Item label="Data">{handler?.schedule.scheduleData.date?.toLocaleDateString()}</Descriptions.Item>
      <Descriptions.Item label="Horário">
        {handler?.schedule.scheduleData.hour?.hour}:{handler?.schedule.scheduleData.hour?.minutes} 
      </Descriptions.Item>
      </Descriptions>,
    <br />,

    <Button type="primary" href="/" >
      Voltar
    </Button>,
    <Button disabled={handler?.schedule.scheduleData.user?.email ? false : true} >Minha conta</Button>,
  ]}
/>
    
    </>)

}