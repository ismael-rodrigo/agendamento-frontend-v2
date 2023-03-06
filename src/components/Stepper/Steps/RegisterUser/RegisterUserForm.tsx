import  { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, FormInstance, Input, message, Row, Tooltip  } from 'antd';
import { CalendarOutlined, IdcardOutlined, InfoCircleOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { ScheduleContext } from '../../../../context/NewScheduleContext';
import { dateMask } from '../../../../utils/mask/DateMask';
import { userSchema } from '../../../../types/entities/User';
import { Backend } from '../../../../external/api';



type CreateAccountParams = {
    cpf?:string
    name?:string
    email?:string
    phone_number?:string
}





const CreateAccount = ({ params }:{ params: CreateAccountParams }) =>{ 

    const [termAgree, setTermAgree] = useState(false)
    const handler = useContext(ScheduleContext)
    const [errors ,setErrors] = useState([] as string[])
    
    const onFinish = async (values: any) => {
        const result = userSchema.safeParse(values)
        if(!result.success){
            setErrors(result.error.errors.map(err => String(err.path[0])))
            return 
        }
        const userRegistered = await Backend.createUser(result.data)
        
        if(userRegistered.isLeft()){
            return
        }
        handler?.notification.messageApi.open({
            type: 'success',
            content: 'Bem vindo, ' + userRegistered.value.user.name.split(' ')[0] + ' !',
          });
        handler?.schedule.loginSuccess(userRegistered.value.user ,userRegistered.value.token )
        
    };

    const onFinishFailed = (errorInfo: any) => {
        setErrors(errorInfo.errorFields.map((err:any) => err.name[0]));
      };


return(


  <Form

    layout='vertical'
    name="basic"
    labelCol={{ }}
    wrapperCol={{ }}
    style={{padding:5 , width:'100%' }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
        <Form.Item
            label="Nome completo"
            initialValue={params.name}
            name="name"
            rules={[{
                required:true , 
                message:'' ,  
            }]}
            >
            <Input width='100%' 
                prefix={<UserOutlined className="site-form-item-icon" />}
                />
        </Form.Item>
        <Form.Item
            label="Email"
            initialValue={params.email}
            name="email"
            validateStatus={ errors.find((v)=>v=='email') ? 'error' : 'success'}
            rules={[{required:true , message:'' ,}]}
            >
            <Input width='100%' 

                prefix={<MailOutlined />}
                />
        </Form.Item>
    
    <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                initialValue={handler?.schedule.cpf}
                label="CPF"
                name="cpf"
                validateStatus={ errors.find((v)=>v=='cpf') ? 'error' : 'success'}
                rules={[{required:true , message:''}]}
                >
                <Input width='100%'
                
                maxLength={11}
                prefix={<IdcardOutlined />}
                suffix={
                    <Tooltip title="CPF do usuário.">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }/>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label="Telefone"
                    initialValue={params.phone_number}
                    name="phone_number"
                    validateStatus={ errors.find((v)=>v=='phone_number') ? 'error' : 'success'}
                    rules={[{required:true , message:''}]}
                    >
                    <Input width='100%'
                    maxLength={11}
                    prefix={<PhoneOutlined />}
                    />
                </Form.Item>
            </Col>
    </Row>
    <Row gutter={24}>
            <Col span={12}>
                    <Form.Item
                    name="password"
                    label="Senha"
                    validateStatus={ 
                        errors.find((v)=>v=='password') ? 'error' : ''
                    }
                    help="A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e no mínimo 8 caracters."
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                    hasFeedback>
                        <Input.Password 
                        prefix={<LockOutlined />}
                        />
                </Form.Item>
            </Col>

            <Col span={12}>
            <Form.Item
                
                name="confirm"
                label="Confirme a senha"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true, 
                    message:''               },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject();
                    },
                }),

                ]}
            >
                <Input.Password 
                    prefix={<LockOutlined />}
                />
            </Form.Item>
            </Col>
    </Row>
    <br />
    <Row gutter={24} align='middle'  >
            <Col flex="auto"  >
                <Row align='middle' gutter={12} wrap={false} >
                    <Col flex="none">
                        <Checkbox checked={termAgree} onChange={ (e)=>setTermAgree(e.target.checked) } />
                    </Col>
                    <Col flex="auto">
                        <p>Concordo com os <a>termos de uso</a> do sistema de agendamento. Termo <b>obrigatório</b> para efetuar o agendamento.</p>
                    </Col>
                </Row>
            </Col>
    </Row>
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

            <Button type="primary" htmlType="submit" disabled={!termAgree}  >
                Finalizar cadastro 
            </Button>
      
        </Col>
    </Row>


  </Form>
);}

export default CreateAccount;