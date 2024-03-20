import Image from "next/image";
import { FaMapMarkerAlt, FaLaptop, FaTag, FaUserCircle, FaBriefcase, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import Link from "next/link";
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
    user_id: number
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

export default async function Service({ params: { user_id, service_id } }: { params: { service_id: number, user_id: number } }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${user_id}/${service_id}`);
    const service = await res.json()

    const service_info: post_info = service[0]
    const user_info: user_info = service[1]

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full min-h-screen px-4">
                {/* Tarjeta Principal del Servicio */}
                <div className="bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 mb-8">
                    <div className="flex flex-wrap md:flex-nowrap md:items-start"> {/* Asegúrate de que los elementos estén alineados al inicio */}
                        {/* Contenedor de Imágenes */}
                        <div className="w-full md:w-1/2">
                            <div className="relative h-80 w-full">
                                <Image
                                    src={service_info?.pictures}
                                    alt="Service Image"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                        {/* Detalles del Servicio con iconos */}
                        <div className="w-full md:w-1/2 p-4 space-y-6 flex flex-col justify-between"> {/* Flexbox column con justify-between para espacio */}
                            <div>
                                <h2 className="text-3xl font-bold my-1">{service_info.title}</h2>
                                <p className="text-gray-700 my-1">{service_info.description}</p>
                                <div className="flex items-center text-sm my-1">
                                    <FaTag className="text-primary mr-2" />
                                    <span>{service_info.category}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaMapMarkerAlt className="text-primary mr-2" />
                                    <span>{service_info.city}, {service_info.country}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaLaptop className="text-primary mr-2" />
                                    <span>Remote: {service_info.is_remote}</span>
                                </div>
                                <div className="flex items-center text-sm my-1">
                                    <FaTag className="text-primary mr-2" />
                                    <span>Price range: {service_info.price_min} - {service_info.price_max} USD</span>
                                </div>
                            </div>
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center">
                                <FaEnvelope className="mr-2" />
                                Contact {user_info.first_name} for this service
                            </button>
                        </div>
                    </div>
                </div>
                {/* Sección "About" con mejora visual */}
                <div className="bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 space-y-3">
                    <Link href={`/publicprofile/${user_info.user_id}`}>
                    <div className="flex items-center cursor-pointer">
                        <h3 className="text-xl font-bold mr-4">About</h3>
                        {user_info.avatar ? (
                            <Image
                                src={user_info.avatar} // Asegúrate de que esto sea una URL válida
                                alt="user img"
                                width={30}
                                height={30}
                                className="rounded-full mr-2"
                            />
                        ) : (
                            <FaUserCircle size={30} className="text-gray-500 mr-2" />
                        )}
                        <span className="text-md">{service_info.user_handle}</span>
                    </div>
                    </Link>
                    
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                            <FaUserCircle className="text-primary mr-2" />
                            <span>{user_info.first_name} {user_info.last_name}</span>
                        </div>
                        <div className="flex items-center">
                            <FaBriefcase className="text-primary mr-2" />
                            <span>{user_info.profession}</span>
                        </div>
                        <div className="flex items-center">
                            <FaInfoCircle size={30} className="text-primary mr-2" />
                            <span className="text-sm">{user_info.description}</span>
                        </div>
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="text-primary mr-2" />
                            <span>{user_info.city}, {user_info.country}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}