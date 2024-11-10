import axios from "axios";

export const commonApi=async(method,url,reqBody,reqHeader)=>{
    const config={
        method,
        url,
        data:reqBody,
        headers:reqHeader ? reqHeader : {"Content-Type":"application/json"},
        withCredentials:true
    }
    return await axios(config).then(data=>{
        return data
    }).catch(data=>{
       return data 
    })
}