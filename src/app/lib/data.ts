import { Inputs } from "../singup/page";
import { loginInputs } from "../login/page";
export async function Register<Inputs>(data : Inputs){
    console.log(data)
}

export async function LoginFetch<loginInputs>(data: loginInputs){
    console.log(data)
} 

