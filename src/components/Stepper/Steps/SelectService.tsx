import { Button, Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";


const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

export default function SelectService(){

    const [locationsLoaded , setLocationsLoaded] = useState(true)
    const [serviceLoaded , setServicesLoaded] = useState(true)

    return(<>
    <Row>
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
            label="Unidade de atendimento"
            name="location"
            rules={[{ required: true, message:''}]}
            >
            <Select
            size="large"
            placeholder='Selecione uma unidade de atendimento'
            style={{ width: '100%' }}
            loading={ locationsLoaded? false:true }
            disabled={ locationsLoaded? false:true }
            options={[
                { value: '1', label: 'Casa do cidadão' },
                { value: '2', label: 'Secretaria da saúde' },
            ]}
            />
        </Form.Item>


        <Form.Item
            label="Serviço"
            name="service_id"
            rules={[{ required: true, message:''}]}
            
            >
            <Select
            size="large"
            placeholder='Selecione um serviço'
            style={{ width: '100%' }}
            loading={ serviceLoaded? false:true }
            disabled={ serviceLoaded? false:true }
            options={[
                { value: '1', label: 'Emissao de RG' },
                { value: '2', label: 'Emissao de CPF' },
                { value: '3', label: 'Emissao de Carteira de trabalho' },
            ]}
            />
        </Form.Item>


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
                <Button type="primary" htmlType="submit" >
                    Avançar 
                </Button>
            </Col>
        </Row>


        </Form>
    </Row>
    </>)
}