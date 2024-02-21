'use client'
import { useAuth } from "../context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IoIosLogOut } from "react-icons/io";



export default function Profile(){
    const router = useRouter()
    const {user, logout} = useAuth()


    useEffect(() =>{
        if(user === null){
         router.push('/')
        }
    }, [user])
    

    return(
        <div className="flex justify-center h-screen items-center space-x-2">
            <p className="mx-2">Name :{user?.user.user_handle}</p>
            <p className="mx-2">Email :{user?.user.user_email}</p>
            <p>Logout</p>
            <IoIosLogOut onClick={logout} />
        </div>
    )
}