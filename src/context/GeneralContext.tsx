import message from "antd/es/message"
import { MessageInstance } from "antd/es/message/interface"
import notification from "antd/es/notification"
import { NotificationInstance } from "antd/es/notification/interface"
import { createContext } from "react"

interface NotificationContext {
    messageApi:MessageInstance
    notification:NotificationInstance
}

export const generalContext = createContext< NotificationContext | null>(null)

export const GeneralContextProvider = ({children}:any)=>{

    const [messageApi, contextHolder] = message.useMessage();
    
    return (
        <generalContext.Provider value={
            {
                messageApi,
                notification
            }
            
        } >
        {contextHolder}
        {children}
        </generalContext.Provider>
    )



}

