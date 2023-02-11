export const getLocationsAvailable = ()  =>{
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(
                [
                    {id:"123", name:'Casa do cidadão', address:"address"},
                    {id:"321", name:'Secretaria Municipal', address:"address 2"}
                ]
                )
        }, 5000)
    })
}

export const getServicesAvailable = ()  =>{
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(
                [
                    {id:"222", name:'Emissao de RG'},
                    {id:"333", name:'Emissao de CPF'}
                ]
                )
        }, 5000)
    })
}