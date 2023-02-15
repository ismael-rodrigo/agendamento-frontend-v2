import { Card, Radio, Skeleton, Space } from "antd"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Hours } from "../../../../../types/HourAvailable"



export interface HoursAvailableParams{
    hours:Hours[]
    setHourSelected:Dispatch<SetStateAction<Hours | null>>
}


export const HoursAvailableContainer = (params: HoursAvailableParams)=> {

    const [loadingInfos , setLoadingInfos] = useState(false)
    const [value, setValue] = useState<string>('')

    
    const changeHourHandler = (hour: Hours) =>{
        setValue(hour.id)
        params.setHourSelected(hour)
    }


    useEffect(()=>{
        setValue('')
    },[params.hours])

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
        : params.hours.length>0 &&
        <Radio.Group 
            buttonStyle="solid"
            defaultValue={''}
            value={value}
            >
            <Space size={[10, 10]} wrap >
                { 
                params.hours.map((hour , index)=>(   
                <Radio.Button onClick={()=>changeHourHandler(hour)}  key={index} style={{ borderRadius:0}} value={hour.id}>{`${hour.hour}:${hour.minutes}`}</Radio.Button>  
                ))
                }
            </Space>
        </Radio.Group>}
    </Card>


    
    </>)
}