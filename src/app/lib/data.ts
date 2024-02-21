import { Inputs } from "../singup/page";
import { loginInputs } from "../login/page";
export async function Register<Inputs>(data : Inputs){
    try {
        let response = await fetch('http://127.0.0.1:5000/post_user', {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
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
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const resp = await response.json()
        localStorage.setItem('token', resp.token)
        return response.status
    } catch (error) {
        console.log(error);
    }
} 

