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
    is_remote: string,
    pictures: string,
    price_max: string,
    price_min: string,
    country: string,
    title: string,
    user_handle: string,
    user_id: number,
    remote: string,
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


export default function Service({ params: { user_id, service_id } }: { params: { service_id: number, user_id: number } }) {
    const [service, setService] = useState<post_info>()
    const [user_info, setUserInfo] = useState<user_info>()
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${service_id}`)
            .then(res => res.json())
            .then(data => setService(data))

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${user_id}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, [service_id, user_id])



    const handleClick = async () => {
        // Asegurarse de que el usuario está cargado y autenticado antes de proceder
        if (!user) {
            // Si el usuario no está logueado, muestra un mensaje y redirige al login
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to be logged in to contact for services!',
            });
            router.push('/login');
            return;
        } else if (!user.profile) {
            // Si el perfil del usuario no está completo, muestra un mensaje y redirige a completar el perfil
            Swal.fire({
                icon: 'error',
                title: 'Profile Incomplete',
                text: 'Please complete your profile before contacting for services!',
            });
            router.push('/complete_profile');
            return;
        }
    
        // Si el usuario está autenticado y tiene el perfil completo, procede con el envío del email
        setIsSendingEmail(true); // Inicia el indicador de carga
    
        const email = {
            "title": service?.title,
            "phone": user.profile.phone,
            "subject": 'I am interested in your quicklyjobs post',
            "to": service?.email,
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
            setIsSendingEmail(false); // Detiene el indicador de carga
        }
    };

    if (!service || !user_info) {
        return <DetailSkeleton />;
      }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full min-h-screen md:mt-0 mt-20 px-4">
                {/* Tarjeta Principal del Servicio */}
                <div className="bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 mb-8">
                    <div className="flex flex-wrap md:flex-nowrap md:items-start"> {/* Asegúrate de que los elementos estén alineados al inicio */}
                        {/* Contenedor de Imágenes */}
                        <div className="w-full md:w-1/2">
                            <div className="relative h-80 w-full">
                                {service?.pictures &&
                                    <Image
                                        src={service.pictures}
                                        alt="Service Image"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                }
                            </div>
                        </div>
                        {/* Detalles del Servicio con iconos */}
                        <div className="w-full md:w-1/2 p-4 space-y-6 flex flex-col justify-between"> {/* Flexbox column con justify-between para espacio */}
                            <div>
                                <h2 className="text-3xl font-bold my-1">{service?.title}</h2>
                                <p className="text-gray-700 my-1">{service?.description}</p>
                                <div className="flex items-center text-sm my-1">
                                    <FaTag className="text-primary mr-2" />
                                    <span>{service?.category}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaMapMarkerAlt className="text-primary mr-2" />
                                    <span>{service?.city}, {service?.country}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaLaptop className="text-primary mr-2" />
                                    <span>Remote: {service?.is_remote}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaTag className="text-primary mr-2" />
                                    <span>Price range: {service?.price_min} - {service?.price_max} USD</span>
                                </div>
                            </div>
                            <button onClick={handleClick} disabled={isSendingEmail} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center">
                                {isSendingEmail ? (
                                    // Puedes insertar aquí tu spinner o mensaje de carga
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
                    <Link href={`/publicprofile/${service?.user_id}`}>
                        <div className="flex items-center cursor-pointer">
                            <h3 className="text-xl font-bold mr-4">About</h3>
                            {service?.avatar ? (
                                <Image
                                    src={service?.avatar} // Asegúrate de que esto sea una URL válida
                                    alt="user img"
                                    width={30}
                                    height={30}
                                    className="rounded-full mr-2"
                                />
                            ) : (
                                <FaUserCircle size={30} className="text-gray-500 mr-2" />
                            )}
                            <span className="text-md">{service?.user_handle}</span>
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