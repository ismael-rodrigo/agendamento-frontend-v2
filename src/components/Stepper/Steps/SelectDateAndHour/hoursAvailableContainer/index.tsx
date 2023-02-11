import { Card, Radio, Skeleton, Space } from "antd"
import { Dispatch, SetStateAction, useState } from "react"
import { hoursAv } from "./data"

export interface Hours {
    id:string
    hour:number
    minutes:number
}

export interface HoursAvailableParams{
    dateSearch:Date | null
    serviceId:string
    setHourSelected:Dispatch<SetStateAction<Hours | null>>
}



export const HoursAvailableContainer = (params: HoursAvailableParams)=> {

    const [loadingInfos , setLoadingInfos] = useState(false)

    const hours = hoursAv

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
                {hours.map((hour , index)=>(   
                <Radio.Button onClick={()=>params.setHourSelected(hour) }  key={index} style={{ borderRadius:0}} value={hour.id}>{`${hour.hour}:${hour.minutes}`}</Radio.Button>  
                ))}
            </Space>
        </Radio.Group>}
    </Card>


    
    </>)
}