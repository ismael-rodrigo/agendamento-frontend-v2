
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

    private constructor( message:string , title:string , type?:string ){
        this.type = type
        this.message = message
        this.title = title
    }

    static create({message , title , statusCode , type}:IAppError):AppError{
        return new AppError(message , title , type  )
    }




}


