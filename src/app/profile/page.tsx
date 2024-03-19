'use client';
import Image from "next/image";
import { BiPencil, BiUserCircle, BiUser, BiPhone, BiLogoGmail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { useState } from "react";
import EditProfileModal from "../components/editprofile";

export default function Profile() {
  const {user, loading} = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <div className="flex justify-center lg:mt-40 lg:mx-0 mx-6">
      <div className="w-full max-w-6xl">
        
        
          {/* Purple banner at the top */}
          <div className="relative bg-purple-600 rounded-t-lg h-48 px-4 pt-4 pb-16 flex justify-end items-center">
        </div>

        {/* White block for user info */}
        <div className="bg-white rounded-b-lg shadow-lg px-6 pt-16 pb-8 -mt-12 relative z-10">
          {/* User's avatar */}
          <div className="absolute -top-24 left-5 w-36 h-36 rounded-full overflow-hidden border-4 border-white">
            {user?.profile?.avatar ? 
            <Image
            src={user?.profile?.avatar}
            alt="Profile picture"
            width={144}
            height={144}
            className="object-cover"
          />:  <BiUser size={100} className="rounded-full mb-2" />
            }
            
          </div>

          {/* User's information */}
          <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user?.profile?.first_name} {user?.profile?.last_name}</h1>
            <h2 className="text-xl mb-1">{user?.profile?.profession}</h2>
            <p className="text-sm mb-1">{user?.profile?.city}, {user?.profile?.country}</p>
            <p className="text-sm mb-1 flex"><BiPhone className="mr-1"  size={20}/> {user?.profile?.phone}</p>
            <p className="text-sm mb-1 flex"><BiLogoGmail  className="mr-1" size={20}/> {user?.user?.user_email}</p>
            <div className="flex space-x-2 mt-4">
              {user?.profile?.available == "Yes" && 
              <button className="border rounded-md py-1 px-3 text-sm">
                Open to contract
              </button> }
             {user?.profile?.looking_for == "Yes" &&
              <button className="border rounded-md py-1 px-3 text-sm">
                  Searching for gigs
              </button>
             }
              {user?.profile?.hiring == "Yes" &&
              <button className="border rounded-md py-1 px-3 text-sm">
                Hiring
              </button>
              }
            </div>
          </div>
          <div className="cursor-pointer">
          <FaRegEdit onClick={toggleEditModal} size={25}/>

          </div>

          </div>
          
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg px-6 pt-4 pb-4 mt-4">
          <h3 className="text-lg font-semibold">About</h3>
          <p>{user?.profile?.description}</p>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg shadow-lg px-6 pt-4 pb-4 mt-4 mb-10">
          <h3 className="text-lg font-semibold">Experience</h3>
          {/* Replace with actual experience items */}
          <p>{user?.profile?.company} - Company</p>
          <p>{user?.profile?.role} - Previous role</p>
          <p>{user?.profile?.experience} - Years of Experience</p>
        </div>
      </div>
    </div>
    <EditProfileModal isOpen={isEditModalOpen} onClose={toggleEditModal} user={user} />
    </>
  
  );
}
