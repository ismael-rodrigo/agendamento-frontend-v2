import  { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Space, Switch, Tooltip } from 'antd';
import { CalendarOutlined, IdcardOutlined, InfoCircleOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { CreateUserDto } from '../../../use-case/NewSchedule/CreateUser';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};




const App = ({ params }:{ params:CreateUserDto }) =>{ 

    const [termAgree, setTermAgree] = useState(false)
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
            rules={[{ required: true, message:''}]}
            >
            <Input width='100%' 
                prefix={<UserOutlined className="site-form-item-icon" />}
                />
        </Form.Item>
        <Form.Item
            label="Nome da mãe ou responsável"
            initialValue={params.monther_name}
            name="monther_name"
            rules={[{ required: true, message: '' }]}
            >
            <Input width='100%' 
                prefix={<UserOutlined className="site-form-item-icon" />}
                />
        </Form.Item>
    
    <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                initialValue={params.cpf}
                label="CPF "
                name="cpf"
                rules={[{ required: true, message: '' }]}
                >
                <Input width='100%'
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
                    rules={[{ required: true, message: '' }]}
                    >
                    <Input width='100%'
                    prefix={<PhoneOutlined />}
                    />
                </Form.Item>
            </Col>
    </Row>
    <Row gutter={24} align='middle'  >
            <Col flex="none">
                <Form.Item
                label="Nascimento "
                initialValue={params.date_birth}
                name="date_birth"
                rules={[{ required: true, message: '' }]}
                >
                <Input width='100%' 
                    prefix={<CalendarOutlined />}
                    suffix={
                    <Tooltip title="Data de nascimento dia/mes/ano">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                    }
                    />

                </Form.Item>
            </Col>

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

export default App;