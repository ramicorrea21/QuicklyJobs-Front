import { Inputs } from "../singup/page";
import { loginInputs } from "../login/page";
export async function Register<Inputs>(data : Inputs){
    try {
        let response = await fetch('http://127.0.0.1:5000/post_user', {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        return response.status
    } catch (error) {
        console.log(error);
    }
}

export async function LoginFetch<loginInputs>(data: loginInputs){
    try {
        let response = await fetch('http://127.0.0.1:5000/login', {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        if(response.status == 200){
            const data = await response.json()
            sessionStorage.setItem("token", data.token)
        }
        return response.status
        
    } catch (error) {
        console.log(error);
    }
} 

export async function fectchUserData(token : any){
    let response = await fetch('http://127.0.0.1:5000/getuserdata',{
        headers:{Authorization: `Bearer ${token}`}
    })
    return response.json()
}