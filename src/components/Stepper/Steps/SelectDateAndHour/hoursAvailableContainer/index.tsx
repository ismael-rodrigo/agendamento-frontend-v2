import { Card, Col, Radio, Row, Skeleton, Space } from "antd"
import { useState } from "react"

export interface HoursContainerParams {
    id:string
    hour:number
    minutes:number
}


export const HoursAvailableContainer = (params: { hours:HoursContainerParams[]})=> {

    const [loadingInfos , setLoadingInfos] = useState(false)



    return(<>
    <Card title="Horários disponíveis" type="inner" bordered={true} >     
    {loadingInfos?
        <Space size={[10, 10]} wrap >
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
            <Skeleton.Button active shape={"square"}  />
        </Space>   
        :
        <Radio.Group 
            buttonStyle="solid"
            >
            <Space size={[10, 10]} wrap >
                {params.hours.map((hour)=>(   
                <Radio.Button style={{ borderRadius:0}} value={hour.id}>{`${hour.hour}:${hour.minutes}`}</Radio.Button>  
                ))}
            </Space>
        </Radio.Group>}
    </Card>


    
    </>)
}