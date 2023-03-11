import { Button, Checkbox, Col, Form, Input, Result, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { useContext, useState } from 'react';
import { generalContext } from '../../context/GeneralContext';
import { getInternalError } from '../../error/internalErrors/errors-bundles-pt-br';
import { Backend } from '../../external/api';




export const RecoveryUser = ()=> {
    const [result , setResult] = useState<'wait' | 'error' | 'success'>('wait')
    const feedback = useContext(generalContext)
    const [loading ,setLoading] = useState(false)


    const onFinish = async (values: any) => {
        setLoading(true)
        const result = await Backend.recoveryUser(values)
        if(result.isRight()){
            setResult('success')
            setLoading(false)
            return
        }
        setLoading(false)
        const internalError = getInternalError(result.error.type)
        feedback?.messageApi.error({
            content:internalError.title+' '+internalError.message
        })
      };
      
      const onFinishFailed = (errorInfo: any) => {
        feedback?.messageApi.info({
            content:'Preencha o formulário corretamente.'
        })
      };



    return(
        <>
{result=='wait' && 
<>
        <Title level={3}>Recupere sua senha</Title>
        <Form
          layout='vertical'
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{width:'100%'}}
        >
          <Form.Item
            label="CPF"
            name="cpf"
            rules={[{ required: true, message: '' }]}
            style={{width:'100%'}}
          >
            <Input width='100%'  />
          </Form.Item>
          <Row>
            <Form.Item
                label="Email"
                name="email"
                style={{width:'100%'}}
                rules={[{ required: true, message: '' }]}
            >
                <Input width='100%'  type='email' />
            </Form.Item>
          </Row>
          <br />
          
          <Row>
                <Col flex='auto' >
                    <Button type="dashed" href='/'>
                        Voltar
                    </Button>
                </Col>
                <Col flex='none' >
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Enviar
                    </Button>
                </Col>
          </Row>


        </Form> 
    </>}
{result =="success" &&
  <Result
  status="success"
  title={`Email com as instruções para a recuperação da conta foi enviado.`}
  subTitle="Acesse o email enviado e recupere sua conta."
  extra={
    <Button href='/' type="primary" key="console">
      Página Inicial
    </Button>}
/>
}

{result == "error" &&

<Result
status="error"
title="Não foi possível recuperar a sua conta !"
subTitle="Tente novamente mais tarde, caso não consiga entre em contato com o suporte do site."
extra={
    <Button href='/' type="primary" key="console">
      Página Inicial
    </Button>}
/>
}


        </>)
}