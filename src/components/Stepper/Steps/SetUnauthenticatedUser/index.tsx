import  { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, FormInstance, Input, message, Row, Tooltip  } from 'antd';
import { CalendarOutlined, IdcardOutlined, InfoCircleOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { ScheduleContext } from '../../../../context/NewScheduleContext';
import { dateMask } from '../../../../utils/mask/DateMask';
import { userSchema } from '../../../../types/entities/User';
import { Backend } from '../../../../external/api';
import { AuthUseCase } from '../../../../use-case/Authentication';
import { generalContext } from '../../../../context/GeneralContext';
import { unauthenticatedUserSchema } from '../../../../types/entities/UnauthenticatedUser';





export const SetUnauthenticatedUserStep = ()=> {

    const [termAgree, setTermAgree] = useState(false)
    const handler = useContext(ScheduleContext)
    const feedback = useContext(generalContext)
    const [errors ,setErrors] = useState([] as string[])

    const {createAccount} = AuthUseCase()

    const onFinish = async (values: any) => {
        const result = unauthenticatedUserSchema.safeParse(values)
        if(!result.success){
            setErrors(result.error.errors.map(err => String(err.path[0])))
            return 
        }

        handler?.schedule.setUnauthenticatedUser(values)
        console.log(handler?.schedule.scheduleData)
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
                  name="name"
                  validateStatus={ errors.find((v)=>v=='name') ? 'error' : 'success'}
                  rules={[{
                      required:true , 
                      message:'' ,  
                  }]}
                  >
                  <Input width='100%' 
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      />
              </Form.Item>
          
          <Row gutter={24}>
                  <Col span={12}>
                      <Form.Item
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
      
              <Col flex='auto'   >
                  <Button type="dashed" >
                      Voltar 
                  </Button> 
              </Col>
              <Col />
               
              <Col flex='none' >
      
                  <Button type="primary" htmlType="submit" disabled={!termAgree}  >
                      Finalizar cadastro 
                  </Button>
            
              </Col>
          </Row>
      
      
        </Form>
      )



}