
class InternalError{
    constructor(
        public internalError:string ,
        public title:string ,
        public message:string,
        public redirectTo?:string
        ){}
}

class UndefinedError extends InternalError {
    constructor(){
        super(
            'UNDEFINED_ERROR' ,
            'Erro desconhecido !',
            'Não foi possível identificar o causador desse error, tente novamente mais tarde. Caso o problema continue entre em contato com o suporte do site.')
    }
}


const internalErrors = [
    new InternalError(
        "USER_ALREADY_SCHEDULE_IN_DATE",
        'Você já possui um agendamento nessa data',
        'Foi verificado que você já possui um agendamento em aberto para a data escolhida, caso precise de informações sobre esse agendamento acesse sua conta ou entre em contato com o suporte do site.',
        'dates'),

    new InternalError(
        'INVALID_EMAIL',
        'Email inválido !',
        'Verifique o email e tente novamente.'),

    new InternalError(
        'CPF_INVALID',
        'CPF inválido !',
        'Verifique o cpf informado e tente novamente.'),
]



export const getInternalError = (errorType?:string) => {
    const error = internalErrors.find((value)=> value.internalError == errorType )
    if(!error){
        return new UndefinedError()
    }
    return error
}