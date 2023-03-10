import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, message, Row, Space, Tooltip } from "antd";
import { useContext , useState } from "react";
import { ScheduleContext } from "../../../context/NewScheduleContext";
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { Backend } from "../../../external/api";
import { AuthUseCase } from "../../../use-case/Authentication";

export default function LoginStep(){
    const handler = useContext(ScheduleContext)
    const [showPassord ,setShowPassord ] = useState(false)
    const [cpf,setCpf] = useState('')
    const [cpfError, setCpfError] = useState(false)
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const { login } = AuthUseCase()





    const handlerLogin = async ()=> {
      if(!showPassord){
        handler?.schedule.userNotExists(cpf)
        return;
      }

      const result = await login({ cpf, password})
      if(result.isLeft()) {
        handler?.feedback.messageApi.open({
          type: 'error',
          content: 'A credencial informada é inválida !',
        });
        setPasswordError(true)
        return;
      }
      handler?.feedback.messageApi.open({
        type: 'success',
        content: 'Bem vindo, ' + result.value.user.name.split(' ')[0] + ' !',
      });
      handler?.schedule.loginSuccess(result.value.user , result.value.token)
    }


    const handlerCpfInput = async (value:string) =>{
      setCpf(value)
      if(value.length < 11) {
        setShowPassord(false); 
        return setCpfError(false)
      }
      if(!cpfValidator.isValid(value)) return setCpfError(true)
      setCpfError(false)
      setLoading(true)
      const userAlreadyExists = await Backend.checkIfUserExists(value)
      setLoading(false)
      if(userAlreadyExists.isLeft()) return
      setShowPassord(true)
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
        value={password}
        status={passwordError? 'error': undefined}
        prefix={<UnlockOutlined  className="site-form-item-icon" />}
        onChange={(v)=>{
          setPassword(v.target.value)
        }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />}
        </Row>
            
        <Button disabled={ cpfError || cpf.length < 11 || loading } loading={loading} type="primary" block size='large' style={{marginTop:10}} onClick={()=>handlerLogin()} >
          Iniciar agendamento
        </Button>
        <Button type="link" size='small'>
          Não consigo acessar minha conta
        </Button>

      </Space>
   )
}