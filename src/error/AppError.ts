
export interface IAppError{
    type?:string, 
    message:string, 
    title:string
    statusCode?:number
}



export class AppError {
    public readonly type?:string
    public readonly message:string
    public readonly title:string
    public readonly status?:number

    private constructor( message:string , title:string ,status?:number, type?:string ){
        this.type = type
        this.message = message
        this.title = title
        this.status = status
    }

    static create({message , title , statusCode , type}:IAppError):AppError{
        return new AppError(message , title ,statusCode , type  )
    }




}


