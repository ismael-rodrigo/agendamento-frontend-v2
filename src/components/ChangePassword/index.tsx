import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Result, Row, Space } from 'antd';
import { useState } from 'react';
import { Backend } from '../../external/api';
import { userSchema } from '../../types/entities/User';



export const ChangePassword = ({token}:{token:string})=> {
    const [loading ,setLoading] = useState(false)
    const [result , setResult] = useState<'wait' | 'error' | 'success'>('wait')

    

    const onFinish = async (data:any)=> {
        setLoading(true)
        const result = await Backend.changePassword(data , token )
        if(result.isRight()){
            setLoading(false)
            setResult('success')
            return
        }
        setResult('error')
    }
    

    const onFinishFailed = ()=> {

    }
    



    return (<>
{ result=='wait' &&
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
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item
                name="password"
                label="Senha"
                help="A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e no mínimo 8 caracters."
                rules={[
                {
                    required: true,
                    validator(rule, value, callback) {
                        const result = userSchema.shape.password.safeParse(value)
                        if(result.success) return Promise.resolve()
                        return Promise.reject()
                    },
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
        <br />
        <Row>

            <Col span={24} >
                <Button style={{width:'100%'}} type="primary" htmlType="submit"  loading={loading}   >
                    Alterar senha 
                </Button>
            </Col>
        </Row>
    </Form>}

{result =="success" &&
  <Result
  status="success"
  title="Senha alterada com sucesso !"
  extra={
    <Button href='/' type="primary" key="console">
      Página Inicial
    </Button>}
/>
}

{result == "error" &&

<Result
status="error"
title="Não foi possível alterar sua senha !"
subTitle="Não foi possível alterar a sua senha tente novamente mais tarde, caso não consiga entre em contato com o suporte do site."
extra={
    <Button href='/' type="primary" key="console">
      Página Inicial
    </Button>}
/>
}


    </>);
}