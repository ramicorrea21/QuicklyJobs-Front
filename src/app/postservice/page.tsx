'use client'
import { useEffect } from "react"
import { useAuth } from "../context/authContext"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import RequestForm from "../components/offers&requests/requestForm"

export default function PostService() {
    const router = useRouter()
    const { user, loading } = useAuth()

    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (!loading) {
          if (!token) {
              router.push('/login');
          } else if (!user?.profile) {
              Swal.fire({
                  icon: "error",
                  title: "Profile incomplete!",
                  text: "Please complete your profile before posting a service or request!!",
              });
              router.push('/complete_profile');
          }
      }
  }, [loading, user?.profile, router]);

    return (
        <div className="flex justify-center mt-32 md:mt-0 items-center h-screen">
            <RequestForm />
        </div>
    )
}
