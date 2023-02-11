import {  Card } from "antd"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Calendar, Day, DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { dateBrazilLocale } from "./locale";
import './style.css'



type DateAvailables = {
  date: Date
  is_available: boolean
}


export interface DateAvailableParams {
  setDateSelected:Dispatch<SetStateAction<Date | null>>
  datesAvailable:DateAvailables[]
}


const adapterDate = (date:Date)=> {
  const result = {day:date.getUTCDate() , month:date.getUTCMonth() + 1 , year:date.getUTCFullYear()}
  return(result)
}

const adapterDisabledDates = (dates:DateAvailables[])=>{
  const result = dates.map( (date)=>{
    if(!date.is_available) return adapterDate(date.date)
    return {} as Day
  })
  return result
}


export const DateAvailableContainer = ({datesAvailable , setDateSelected}:DateAvailableParams)=>{
  
  const datesAvailables = datesAvailable.filter((date)=>date.is_available)
  const [selectedDay, setSelectedDay] = useState<DayValue>(adapterDate(datesAvailables[0].date));

  useEffect(()=>{
    if(selectedDay) setDateSelected( new Date(selectedDay.year , selectedDay.month , selectedDay.day) )
  },[selectedDay])


  return(
    <Card title="Datas disponíveis" type="inner" bordered={true}>
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
    </Card>)
}