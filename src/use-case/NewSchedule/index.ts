
import { useState } from 'react';
import { CreateUserDto , CreateUser } from './CreateUser';

import { LoginUser, LoginUserDto } from './LoginUser';

export type Page = 'login' | 'create-account' | 'service' | 'dates-available' | 'confirm' | 'schedule-finish'



export const NewScheduleHandler = () =>{
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

    


    
}