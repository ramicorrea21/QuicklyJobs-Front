import { Inputs } from "../singup/page";
import { loginInputs } from "../login/page";
export async function Register<Inputs>(data : Inputs){
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post_user`, {
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
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
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

export async function fetchServices(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/services`)
    const json = await res.json()
    return(json)
}

export async function fetchOportunites(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests`)
    const json = await res.json()
    return(json)
}

