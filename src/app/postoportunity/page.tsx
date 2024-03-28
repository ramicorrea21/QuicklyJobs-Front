'use client'
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import OfferForm from "../components/offers&requests/offerForm"





export default function PostOportunity(){
    const router = useRouter()
    const user = useAuth()
    
       useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!user.loading) {
          if (!token) {
              router.push('/login');
          } else if (!user?.user?.profile) {
              Swal.fire({
                  icon: "error",
                  title: "Profile incomplete!",
                  text: "Please complete your profile before posting a service or request!!",
              });
              router.push('/complete_profile');
          }
      }
  }, [user.loading, user?.user?.profile, router]);

    return(
    <div className="flex justify-center items-center mt-32 md:mt-0 h-screen">
        <OfferForm />
    </div>
    )
}