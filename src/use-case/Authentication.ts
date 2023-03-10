import { Left, Right } from './../error/Either';
import { Backend } from "../external/api"
import { CreateUserDto } from "../external/services/CreateUser"
import { LoginUserDto } from "../external/services/LoginUser"

export const AuthUseCase = ()=>{

    const login = async ( {cpf , password} :LoginUserDto) => {
        const result = await Backend.login({cpf , password})
        if(result.isLeft()){
            return Left.create(result.error)
        }


        window.localStorage.clear()
        window.localStorage.setItem('user_id', result.value.user.id)
        window.localStorage.setItem('token@access' , result.value.token.access)
        window.localStorage.setItem('token@refresh' , result.value.token.refresh)

        return Right.create(result.value)
    }

    const createAccount = async ({ cpf, name, phone_number ,password , email , confirm}: CreateUserDto)=>{
        const result = await Backend.createUser({ cpf, name, phone_number,password , email , confirm})
        if(result.isLeft()){

        }
    }

    return {
        login,
        createAccount,
    }
}