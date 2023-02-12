import { useState } from 'react';

export type Page = 'login' | 'create-account' | 'service' | 'dates-available' | 'confirm' | 'schedule-finish'



export const newScheduleHandler = () =>{
    const [page, setPage] = useState<Page>('login')

    return {
        page,
        setPage,
    }
}