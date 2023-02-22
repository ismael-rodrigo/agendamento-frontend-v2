import { CalendarOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Row, Space, Tooltip } from "antd";
import { useContext } from "react";
import { ScheduleContext } from "../../../context/NewScheduleContext";

export default function LoginStep(){
    const handler = useContext(ScheduleContext)

    return(
      <Space direction={'vertical'} size={15} style={{ width:'100%' }}>
        <Row>
          <Input
            size='large'
            placeholder=" Insira seu CPF"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Cadastro de Pessoas Físicas (CPF)">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            />
        </Row>
        <Row>
        <Input 
            size='large'
            placeholder=" Insira sua data de nascimento"
            prefix={<CalendarOutlined />}
            suffix={
              <Tooltip title="Data de nascimento dia/mes/ano">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            />
        </Row>
            
        <Button type="primary" block size='large' style={{marginTop:10}} onClick={()=>handler?.setPage({...handler.page, login:'finish' ,register_user:'process'})} >
          Iniciar agendamento
        </Button>
        <Button type="link" size='small'>
          Não consigo acessar minha conta
        </Button>

      </Space>
   )
}