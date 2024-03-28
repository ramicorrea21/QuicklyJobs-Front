'use client'
import Image from "next/image";
import { FaMapMarkerAlt, FaLaptop, FaTag, FaUserCircle, FaBriefcase, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/authContext";
import Swal from "sweetalert2";
import DetailSkeleton from "@/app/components/skeletons/detailskeleton";
import { useRouter } from "next/navigation";


type post_info = {
    avatar: string,
    category: string,
    city: string,
    description: string,
    id: number,
    remote: string,
    pictures: string,
    price_max: string,
    price_min: string,
    country: string,
    title: string,
    user_handle: string,
    user_id: number,
    email: string
}
type user_info = {
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


export default function Request({ params: { user_id, request_id } }: { params: { request_id: number, user_id: number } }) {
    const [request, setRequest] = useState<post_info>()
    const [user_info, setUserInfo] = useState<user_info>()
    const { user } = useAuth()
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const router = useRouter()


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/${request_id}`)
            .then(res => res.json())
            .then(data => setRequest(data))

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${user_id}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, [request_id, user_id])


    const handleClick = async () => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to be logged in to contact for services!',
            });
            router.push('/login');
            return;
        } else if (!user.profile) {
            Swal.fire({
                icon: 'error',
                title: 'Profile Incomplete',
                text: 'Please complete your profile before contacting for services!',
            });
            router.push('/complete_profile');
            return;
        }
    
        setIsSendingEmail(true); // Inicia el indicador de carga
    
        const email = {
            "title": request?.title,
            "phone": user.profile.phone,
            "subject": 'I am interested in your quicklyjobs post',
            "to": request?.email,
            "to_name": user_info?.first_name,
            "my_name": user.profile.first_name,
            "email": user.user.user_email
        };
    
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sendemail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(email)
            });
    
            if (response.status === 200) {
                Swal.fire({
                    title: "Good job!",
                    text: `We sent your contact to ${email.to_name} be aware of your mail or cellphone!`,
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Oops!",
                    text: "Something went wrong. Please try again later.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "There was an issue sending the email.",
                icon: "error"
            });
        } finally {
            setIsSendingEmail(false); 
        }
    };

    if (!request || !user_info) {
        return <DetailSkeleton />;
      }

    return (
        <>
            <div className="flex flex-col items-center justify-center md:mt-0 mt-20 w-full min-h-screen px-4">
                {/* Tarjeta Principal del Servicio */}
                <div className="bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 mb-8">
                    <div className="flex flex-wrap md:flex-nowrap md:items-start">
                        {/* Contenedor de Imágenes */}
                        <div className="w-full md:w-1/2">
                            <div className="relative h-80 w-full">
                                {request?.pictures &&
                                    <Image
                                        src={request.pictures}
                                        alt="request Image"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                }
                            </div>
                        </div>
                        {/* Detalles del Servicio con iconos */}
                        <div className="w-full md:w-1/2 p-4 space-y-6 flex flex-col justify-between"> 
                            <div>
                                <h2 className="text-3xl font-bold my-1">{request?.title}</h2>
                                <p className="text-gray-700 my-1">{request?.description}</p>
                                <div className="flex items-center text-sm my-1">
                                    <FaTag className="text-primary mr-2" />
                                    <span>{request?.category}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaMapMarkerAlt className="text-primary mr-2" />
                                    <span>{request?.city}, {request?.country}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaLaptop className="text-primary mr-2" />
                                    <span>Remote: {request?.remote}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaTag className="text-primary mr-2" />
                                    <span>Price range: {request?.price_min} - {request?.price_max} USD</span>
                                </div>
                            </div>
                            <button onClick={handleClick} disabled={isSendingEmail} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center">
                                {isSendingEmail ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <FaEnvelope className="mr-2" />
                                        Contact {user_info?.first_name} for this service
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Sección "About" con mejora visual */}
                <div className="bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 space-y-3">
                    <Link href={`/publicprofile/${request?.user_id}`}>
                        <div className="flex items-center cursor-pointer">
                            <h3 className="text-xl font-bold mr-4">About</h3>
                            {request?.avatar ? (
                                <Image
                                    src={request?.avatar} 
                                    alt="user img"
                                    width={30}
                                    height={30}
                                    className="rounded-full mr-2"
                                />
                            ) : (
                                <FaUserCircle size={30} className="text-gray-500 mr-2" />
                            )}
                            <span className="text-md">{request?.user_handle}</span>
                        </div>
                    </Link>

                    <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                            <FaUserCircle className="text-primary mr-2" />
                            <span>{user_info?.first_name} {user_info?.last_name}</span>
                        </div>
                        <div className="flex items-center">
                            <FaBriefcase className="text-primary mr-2" />
                            <span>{user_info?.profession}</span>
                        </div>
                        <div className="flex items-center">
                            <FaInfoCircle size={30} className="text-primary mr-2" />
                            <span className="text-sm">{user_info?.description}</span>
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-primary mr-2" />
                            <span>{user_info?.city}, {user_info?.country}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}