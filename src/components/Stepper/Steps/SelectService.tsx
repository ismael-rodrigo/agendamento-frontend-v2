import { Button, Col, Form, Row, Select } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { ScheduleContext } from "../../../context/NewScheduleContext";
import { Backend } from "../../../external/api";
import { LocationType } from "../../../types/entities/Locations";
import { ServiceType } from "../../../types/entities/Services";


const onFinishFailed = (errorInfo: any) => {
console.log('Failed:', errorInfo);
};


const adapterLocations = (locations:LocationType[])=>{
    return locations.map((loc)=>{
        return {
            value:loc.id,
            label:loc.name
        }
    })
}

const adapterServices = (services:ServiceType[])=>{
    return services.map((serv)=>{
        return {
            value:serv.id,
            label:serv.service_name
        }
    })
}


export default function SelectService(){

    const [locationsLoaded , setLocationsLoaded] = useState(false)
    const [serviceLoaded , setServicesLoaded] = useState(false)

    const [services ,setServices] = useState([] as ServiceType[])
    const [locations,setLocations] = useState([] as LocationType[])

    const [locationSelected , setLocationSelected] = useState({} as LocationType )
    const [servicesSelected ,setServicesSelected] = useState({} as ServiceType)
    
    const handler = useContext(ScheduleContext)

    const onFinish = (values: any) => {
        handler?.setServiceAndLocationHandler(servicesSelected , locationSelected )
    };


    
    useEffect(()=>{
        Backend.findLocations().then((result)=>{
            if(result.isLeft()) return
            setLocations(result.value)
            setLocationsLoaded(true)
        })
    },[])




    useEffect(()=>{
        setServicesLoaded(false)
        setServices([])
        locations.length > 0 && Backend.findServices({location_id:locationSelected.id}).then((result)=>{
            if(result.isLeft()) return
            setServices(result.value)
            setServicesLoaded(true)
        })
    },[locationSelected.id])


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
            options={adapterLocations(locations)}

            onChange={(id)=>{ 
                const newLocation = locations.find((obj)=> obj.id === id)
                newLocation && setLocationSelected(newLocation)
            }}

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
            options={adapterServices(services)}
            onChange={(id)=>{ 
                const newService = services.find((obj)=> obj.id === id)
                newService && setServicesSelected(newService)
            }}
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