import {  Card } from "antd"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateAvailable } from "../../../../../types/entities/DateAvailable";
import { dateBrazilLocale } from "./locale";

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue , Day} from '@hassanmojab/react-modern-calendar-datepicker';
import './style.css'

export interface DateAvailableParams {
  setDateSelected:Dispatch<SetStateAction<Date | null>>
  datesAvailable:DateAvailable[]
}


const adapterDate = (date:Date)=> {
  const result = {day:new Date(date).getUTCDate() , month:new Date(date).getUTCMonth() + 1 , year:new Date(date).getUTCFullYear()}
  return(result)
}

const adapterDisabledDates = (dates:DateAvailable[])=>{
  const result:Day[] = dates.map( (date)=>{
    if(!date.is_available) return adapterDate(date.date)
    return {} as Day
  })
  return result
}


export const DateAvailableContainer = ({ datesAvailable , setDateSelected }:DateAvailableParams)=>{
  
  const datesAvailables = datesAvailable.filter((date)=>date.is_available)
  const [selectedDay, setSelectedDay] = useState<DayValue | null>(datesAvailable.length> 0 ? adapterDate(datesAvailables[0].date): null);



  useEffect(()=>{
    if(selectedDay){
    const dateSelected = new Date( selectedDay.year , selectedDay.month-1 , selectedDay.day)
    setDateSelected(dateSelected )

   }
    
  },[selectedDay])


  return(
    <>
    
    {datesAvailable.length>0 && <Card title="Datas disponíveis" type="inner" bordered={true}>
      <Calendar 
      locale={dateBrazilLocale}
      calendarClassName="custom-calendar"
      minimumDate={adapterDate(datesAvailables[0].date)}
      maximumDate={adapterDate(datesAvailables[datesAvailables.length -1 ].date)}
      disabledDays={adapterDisabledDates(datesAvailable)}
      value={selectedDay}
      onChange={( date:DayValue )=> setSelectedDay(date) }
      colorPrimary="#1890ff"  
      />
    </Card>}
    
    </>
    )
}