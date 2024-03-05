'use client'
import { useAuth } from "../context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BiUser } from "react-icons/bi"
import Image from "next/image"



export default function Profile() {
    const router = useRouter()
    const { user, logout } = useAuth()


    const handleLogout = () => {
        router.push('/')
        setTimeout(() =>{
            logout()
        }, 500)
    }


    return (
        <div className="flex justify-center items-center h-screen mt-28 md:mt-0 ">
            {/* Left section - User Profile */}
            <div className="flex flex-col md:flex-row gap-4 p-4 md:items-stretch w-full max-w-4xl">
                {/* User Profile Card */}
                <div className="bg-white shadow-xl rounded-lg flex flex-col">
                    <div className="p-6 flex-grow">
                        <div className="flex flex-col items-start">
                            {user?.profile?.avatar ? (
                                <Image src={user?.profile?.avatar} alt="user img" width={200} height={200} className="rounded-full"/>
                            ) :  <BiUser size={100} className="rounded-full mb-2" /> }
                            <div className="mt-4 mb-2">
                                <p className="font-medium">Username</p>
                                <p>{user?.user.user_handle}</p>
                            </div>
                            <div className="my-2">
                                <p className="font-medium">Email</p>
                                <p>{user?.user.user_email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-b-lg">
                        <button onClick={handleLogout} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Logout
                        </button>
                    </div>
                </div>
                {/* Right section - Specifications */}
<div className="bg-white shadow-xl rounded-lg flex flex-col w-full md:max-w-6xl mx-auto">
    <div className="p-6">
        <h2 className="font-bold text-lg mb-4">Specifications</h2>
        <div className="divide-y divide-gray-200">
            {/* First row with Fullname, Phone, and Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 py-4">
                <div>
                    <p className="font-medium">First Name</p>
                    <p className="truncate">{user?.profile?.first_name} </p>
                </div>
                <div>
                    <p className="font-medium">Last Name</p>
                    <p className="truncate">{user?.profile?.last_name}</p>
                </div>
                <div>
                    <p className="font-medium">Phone</p>
                    <p className="truncate">{user?.profile?.phone}</p>
                </div>
            </div>

            {/* Second row with Profession, Category, Remote, and Available */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 py-4">
                <div>
                    <p className="font-medium">Profession</p>
                    <p>{user?.profile?.profession}</p>
                </div>
                <div>
                    <p className="font-medium">Category</p>
                    <p>{user?.profile?.category}</p>
                </div>
                <div className="flex justify-between md:justify-start md:gap-4 items-center">
                    <div className="flex items-center">
                        <p className="font-medium">Remote</p>
                        <span className={`inline-block w-3 h-3 ml-2 rounded-full bg-red-500`}></span>
                    </div>
                    <div className="flex items-center">
                        <p className="font-medium">Available</p>
                        <span className={`inline-block w-3 h-3 ml-2 rounded-full bg-green-500`}></span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 py-4">
                <div>
                    <p className="font-medium">City</p>
                    <p className="truncate">{user?.profile?.city} </p>
                </div>
                <div>
                    <p className="font-medium">Province</p>
                    <p className="truncate">{user?.profile?.province}</p>
                </div>
                <div>
                    <p className="font-medium">Country</p>
                    <p className="truncate">{user?.profile?.country}</p>
                </div>
            </div>


            {/* Description */}
            <div className="py-4">
                <p className="font-medium">Description</p>
                <p>{user?.profile?.description}</p>
            </div>
        </div>
    </div>
</div>
                
            </div>
        </div>
    );
}
