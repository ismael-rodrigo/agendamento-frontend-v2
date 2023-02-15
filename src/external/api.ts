import axios from "axios"
import { findDatesAvailable, FindDatesAvailable } from "./services/FindDatesAvailable"
import { FindHoursAvailable, findHoursAvailable } from "./services/FindHoursAvailable"
import { findLocationsAvailable } from "./services/FindLocationsAvailable"
import { FindServiceOfLocation, findServicesOfLocation } from "./services/FindServicesOfLocation"


export namespace Backend {
    export const api = axios.create({
        baseURL:'http://192.168.0.11:3333'
    })


    export const findLocations = async () => {
        const result = await findLocationsAvailable(api)
        return result
    }

    export const findServices = async ({location_id}:FindServiceOfLocation) => {
        const result = await findServicesOfLocation(api , {location_id})
        return result
    }

    export const findDates = async ({service_id}:FindDatesAvailable) => {
        const result = await findDatesAvailable(api , {service_id})
        return result
    }

    export const findHours = async ({date , service_id}: FindHoursAvailable) => {
        const result = await findHoursAvailable(api ,{date , service_id})
        return result
    }

} 