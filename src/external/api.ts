import { checkIfUserAlreadyExists } from './services/CheckIfUserExists';
import { CreateUserDto, createUserService } from './services/CreateUser';
import { loginUser, LoginUserDto } from './services/LoginUser';
import axios from "axios"
import { findDatesAvailable, FindDatesAvailable } from "./services/FindDatesAvailable"
import { FindHoursAvailable, findHoursAvailable } from "./services/FindHoursAvailable"
import { findLocationsAvailable } from "./services/FindLocationsAvailable"
import { FindServiceOfLocation, findServicesOfLocation } from "./services/FindServicesOfLocation"
import { createNewSchedule, CreateNewScheduleDTO } from './services/NewSchedule';


export namespace Backend {
    export const api = axios.create({
        baseURL:'http://localhost:3333'
    })


    export const findLocations = async () => {
        const result = await findLocationsAvailable(api)
        return result
    }

    export const findServices = async (params:FindServiceOfLocation) => {
        const result = await findServicesOfLocation(api , params)
        return result
    }

    export const findDates = async (params:FindDatesAvailable) => {
        const result = await findDatesAvailable(api , params)
        return result
    }

    export const findHours = async (params: FindHoursAvailable) => {
        const result = await findHoursAvailable(api ,params)
        return result
    }


    export const login = async (params: LoginUserDto) => {
        const result = await loginUser(api ,params)
        return result
    }

    export const createUser = async (params:CreateUserDto) =>{
        const result = await createUserService(api , params)
        return result
    }

    export const createSchedule = async (params:CreateNewScheduleDTO) => {
        const result = await createNewSchedule(api , params)
        return result
    }

    export const checkIfUserExists = async (cpf:string) => {
        const result = await checkIfUserAlreadyExists(api , {cpf})
        return result
    }
} 