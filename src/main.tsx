import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { GeneralContextProvider } from './context/GeneralContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <GeneralContextProvider>
            <App />
        </GeneralContextProvider>
    </BrowserRouter>
)
