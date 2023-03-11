import { Button, Result } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChangePassword } from '../components/ChangePassword'

export const ChangePasswordPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get('token')

    return (<>
    {token ?
        <ChangePassword token={token} />
        :
        <Result
        status="403"
        title="Vishhh"
        subTitle="Desculpe, você não possui autorização para acessar essa página."
        extra={<Button href='/' type="primary">Página Pricipal</Button>}
      />
    }
        
        
    </>)
}