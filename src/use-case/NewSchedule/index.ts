import { ServiceType } from './../../types/Services';
import { LocationType } from './../../types/Locations';
import { FindDatesAvailable, findDatesAvailable } from './FindDatesAvailable';
import { findLocationsAvailable } from './FindLocationsAvailable';
import { useState } from 'react';
import { CreateUserDto  } from '../CreateUser';
import {  LoginUserDto } from '../LoginUser';
import { FindServiceOfLocation, findServicesOfLocation } from './FindServicesOfLocation';
import { FindHoursAvailable, findHoursAvailable } from './FindHoursAvailable';
import { datesAvailablesData } from '../../components/Stepper/Steps/SelectDateAndHour/dateAvailableContainer/data';
import { hoursAv } from '../../components/Stepper/Steps/SelectDateAndHour/hoursAvailableContainer/data';

export type Page = 'login' | 'create-account' | 'service' | 'dates-available' | 'confirm' | 'schedule-finish'



export const newScheduleHandler = () =>{
    const [page, setPage] = useState<Page>('login')


    const loginHandler = async (params:LoginUserDto)=>{
        //const result = await LoginUser(params)
        //if(result.ok)
        setPage('service')
    }

    const createUserHandler = async (params:CreateUserDto) => {
        //const result = await CreateUser(params)
        //if(result.ok)
        setPage('service')
    }

    const findLocations = async () => {
        const result = await findLocationsAvailable()
        return [{id:'213' , address:'address' , name:'Casa do cidadao'},{id:'321' , address:'address' , name:'Secretaria'}] as LocationType[]
    }

    const findServices = async ({location_id}:FindServiceOfLocation) => {
        const result = await findServicesOfLocation({location_id})
        return [{id:'123',location_id:'2222' , service_name:'CPF'} , {id:'321',location_id:'2233' , service_name:'CNPJ'}] as ServiceType[]
    }

    const findDates = async ({service_id}:FindDatesAvailable) => {
        const result = await findDatesAvailable({service_id})
        return datesAvailablesData
    }

    const findHours = async ({date , service_id}: FindHoursAvailable) => {
        const result = await findHoursAvailable({date , service_id})
        return hoursAv
    }




    return {
        page,
        setPage,
        loginHandler,
        createUserHandler,
        findLocations,
        findServices,
        findDates,
        findHours
    }

    
}