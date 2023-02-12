import axios from "axios"
import { datesAvailablesData } from "../components/Stepper/Steps/SelectDateAndHour/dateAvailableContainer/data"
import { hoursAv } from "../components/Stepper/Steps/SelectDateAndHour/hoursAvailableContainer/data"
import { LocationType } from "../types/Locations"
import { ServiceType } from "../types/Services"
import { findDatesAvailable, FindDatesAvailable } from "./services/FindDatesAvailable"
import { FindHoursAvailable, findHoursAvailable } from "./services/FindHoursAvailable"
import { findLocationsAvailable } from "./services/FindLocationsAvailable"
import { FindServiceOfLocation, findServicesOfLocation } from "./services/FindServicesOfLocation"


export namespace Backend {
    export const api = axios.create({
        baseURL:'http://localhost:3333'
    })


    export const findLocations = async () => {
        const result = await findLocationsAvailable(api)
        return [{id:'213' , address:'address' , name:'Casa do cidadao'},{id:'321' , address:'address' , name:'Secretaria'}] as LocationType[]
    }

    export const findServices = async ({location_id}:FindServiceOfLocation) => {
        const result = await findServicesOfLocation(api , {location_id})
        return [{id:'123',location_id:'2222' , service_name:'CPF'} , {id:'321',location_id:'2233' , service_name:'CNPJ'}] as ServiceType[]
    }

    export const findDates = async ({service_id}:FindDatesAvailable) => {
        const result = await findDatesAvailable(api , {service_id})
        return datesAvailablesData
    }

    export const findHours = async ({date , service_id}: FindHoursAvailable) => {
        const result = await findHoursAvailable(api ,{date , service_id})
        return hoursAv
    }

} 