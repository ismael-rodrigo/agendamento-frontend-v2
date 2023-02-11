import {  Card } from "antd"
import { useState } from "react";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import './style.css'
import { dateBrazilLocale } from "./locale"

export const DateAvailableContainer = ()=>{
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);

    return(
        <Card title="Datas disponíveis" type="inner" bordered={true}>
        <Calendar 
        locale={dateBrazilLocale}
        calendarClassName="custom-calendar"
        minimumDate={{day:12 ,  month:2 , year:2023}}
        maximumDate={{day:26 ,  month:2 , year:2023}}
        value={selectedDay}
        onChange={( date:DayValue )=> setSelectedDay(date) }
        colorPrimary="#1890ff"  
        />
      </Card>)
}