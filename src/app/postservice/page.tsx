'use client'
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import RequestForm from "../components/offers&requests/requestForm"


export default function PostService(){
    const token = localStorage.getItem('token');
    const router = useRouter()
    const user = useAuth()
    
    useEffect(() => {
        if (!user.loading) {
          if (token === null) {
            router.push('/login');
          } else if (user.user?.profile == null) {
            Swal.fire({
              icon: "error",
              title: "Profile incomplete!",
              text: "Please complete your profile before posting a service or request!!",
            });
            router.push('/complete_profile');
          }
        }
      }, [user.loading, user.user?.profile, router]); 


    return(
    <div className="flex justify-center mt-32 md:mt-0 items-center h-screen">
        <RequestForm/>
    </div>
    )
}