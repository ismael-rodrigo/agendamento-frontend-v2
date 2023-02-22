import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Row, Space, Tooltip } from "antd";
import { useContext , useState } from "react";
import { ScheduleContext } from "../../../context/NewScheduleContext";
import { cpf as cpfValidator } from 'cpf-cnpj-validator'

export default function LoginStep(){
    const handler = useContext(ScheduleContext)
    const [showPassord ,setShowPassord ] = useState(false)
    const [cpf,setCpf] = useState('')
    const [cpfError, setCpfError] = useState(false)

    const checkIfUserAlreadyExists = (cpf:string)=>{
      // verify user in backend
        // if user already exist, show password input
        // if not exists, open create user page
    }

    const handlerCpfInput = (value:string) =>{
      setCpf(value)
      if(value.length < 11) return setCpfError(false)
      if(!cpfValidator.isValid(value)) return setCpfError(true)
      setCpfError(false)
    }


    return(
      <Space direction={'vertical'} size={15} style={{ width:'100%' }}>
        <Row>
          <Input
            maxLength={11}
            value={cpf}
            status={cpfError ? 'error' : undefined}
            size='large'
            placeholder=" Insira seu CPF"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Cadastro de Pessoas Físicas (CPF)">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            onChange={(v)=>{
              handlerCpfInput(v.target.value)
            }}

            />
        </Row>
        <Row>
        {showPassord &&
        <Input.Password
        size='large'
        placeholder="Senha de acesso"
        prefix={<UnlockOutlined  className="site-form-item-icon" />}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />}
        </Row>
            
        <Button disabled={cpfError || cpf.length < 11} type="primary" block size='large' style={{marginTop:10}} onClick={()=>handler?.setPage({...handler.page, login:'finish' ,register_user:'process'})} >
          Iniciar agendamento
        </Button>
        <Button type="link" size='small'>
          Não consigo acessar minha conta
        </Button>

      </Space>
   )
}