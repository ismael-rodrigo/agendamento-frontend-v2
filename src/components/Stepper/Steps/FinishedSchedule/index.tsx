import { Button, Result } from "antd"

export const FinishedSchedule = () => {



    return (<>
        <Result
    status="success"
    title="Agendamento Finalizado com Sucesso !"
    subTitle="Número do agendamento: 324 - Emissão de CPF."
    extra={[
      <Button type="primary" key="console">
        Logout
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />
    
    </>)

}