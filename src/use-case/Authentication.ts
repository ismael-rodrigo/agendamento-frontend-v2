import { Backend } from "../external/api"
import { CreateUserDto } from "../external/services/CreateUser"
import { LoginUserDto } from "../external/services/LoginUser"

export const AuthUseCase = ()=>{
    
    const login = async ( {cpf , date_birth} :LoginUserDto) => {
        const result = await Backend.login({cpf , date_birth})
        if(result.isLeft()){

        }

    }

    const createAccount = async ({ cpf, date_birth, monther_name, name, phone_number }: CreateUserDto)=>{
        const result = await Backend.createUser({ cpf, date_birth, monther_name, name, phone_number })
        if(result.isLeft()){

        }
    }

}