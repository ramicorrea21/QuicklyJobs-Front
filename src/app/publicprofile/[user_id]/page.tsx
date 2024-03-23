'use client'
import { BiPencil, BiUserCircle, BiUser, BiPhone, BiLogoGmail } from "react-icons/bi"
import Image from "next/image"
import { useState, useEffect } from "react"
import ProfileSkeleton from "@/app/components/skeletons/ProfileSkeleton"


type profile = {
  available: string,
  avatar: string,
  category: string,
  company: string | null,
  description: string,
  first_name: string,
  last_name: string,
  id: number,
  phone: string,
  profession: string,
  role: string | null,
  country: string,
  user_id: number,
  city: string
}

type user = {
  id : number,
  user_handlle : string,
  user_email: string
}



export default  function PublicProfile({params : user_id} : {params : {user_id : number}}){
  const [user, setUser] = useState<user>()
  const [profile, setProfile] = useState<profile>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user_id.user_id}`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${user_id.user_id}`).then(res => res.json())
    ])
    .then(([userData, profileData]) => {
      setUser(userData);
      setProfile(profileData);
    })
    .catch(error => console.error("Failed to fetch data", error))
    .finally(() => setIsLoading(false));
  }, []);

    if(isLoading){
      return<ProfileSkeleton/>
    }

    return( 
        <div className="flex justify-center lg:mt-40 lg:mx-0 mx-6">
      <div className="w-full max-w-6xl">
        
        
          {/* Purple banner at the top */}
          <div className="relative bg-purple-600 rounded-t-lg h-48 px-4 pt-4 pb-16 flex justify-end items-center">
          <BiPencil size={24} className="text-white" />
          <BiUserCircle size={24} className="text-white" />
        </div>

        {/* White block for user info */}
        <div className="bg-white rounded-b-lg shadow-lg px-6 pt-16 pb-8 -mt-12 relative z-10">
          {/* User's avatar */}
          <div className="absolute -top-24 left-5 w-36 h-36 rounded-full overflow-hidden border-4 border-white">
            {profile?.avatar ? 
            <Image
            src={profile?.avatar}
            alt="Profile picture"
            width={144}
            height={144}
            className="object-cover"
          />:  <BiUser size={100} className="rounded-full mb-2" />
            }
            
          </div>

          {/* User's information */}
          <div>
            <h1 className="text-2xl font-bold">{profile?.first_name} {profile?.last_name}</h1>
            <h2 className="text-xl mb-1">{profile?.profession}</h2>
            <p className="text-sm mb-1">{profile?.city}, {profile?.country}</p>
            <p className="text-sm mb-1 flex"><BiPhone className="mr-1"  size={20}/> {profile?.phone}</p>
            <p className="text-sm mb-1 flex"><BiLogoGmail  className="mr-1" size={20}/> {user?.user_email} </p>
            <div className="flex space-x-2 mt-4">
              <button className="border rounded-md py-1 px-3 text-sm">
                Open to contract
              </button>
              <button className="border rounded-md py-1 px-3 text-sm">
               Searching for gigs
              </button>
              <button className="border rounded-md py-1 px-3 text-sm">
               Hiring
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg px-6 pt-2 pb-4 mt-4">
          <h3 className="text-lg font-semibold">About</h3>
          <p>{profile?.description}</p>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-lg px-6 pt-4 pb-4 mt-4 mb-10">
          <h3 className="text-lg font-semibold">Experience</h3>
          {/* Replace with actual experience items */}
          <p>{profile?.company} - Company</p>
          <p>{profile?.role} - Previous role</p>
        </div>
      </div>
    </div>
    )
}