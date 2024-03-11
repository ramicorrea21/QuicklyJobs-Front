'use client'
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import OfferForm from "../components/offers&requests/offerForm"

export default function PostOportunity(){
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
      }, [user.loading, user.user?.profile]); 


    return(
    <div className="flex justify-center items-center h-screen">
        <OfferForm />
    </div>
    )
}