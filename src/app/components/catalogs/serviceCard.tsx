import { OfferType } from "@/app/services/page";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
interface RequestCardProps {
    off: OfferType;
}


export default function RequestCard({ off }: RequestCardProps) {
    return(
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
        {/* Imagen de la oportunidad */}
        {off.pictures && (
          <div className="mb-4 p-4 border-b border-gray-200 w-full">
            <Image
              src={off.pictures}
              alt="Preview Image"
              width={400} // Establece el tamaño que desees
              height={200}
              className="rounded"
            />
          </div>
        )}
  
        {/* Detalles del usuario y calificación */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="flex items-start">
              {off.avatar ? (
                <Image
                  src={off.avatar}
                  alt="user img"
                  width={25}
                  height={25} // Ajustado para la relación de aspecto
                  className="rounded-full"
                />
              ) : (
                <FaUser size={25} className="rounded-full mb-2" />
              )}
              <span className="text-md ml-1">{off.user_handle}</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-yellow-400">9.9</span>
            <span className="text-xs text-gray-500">(999 users)</span>
          </div>
        </div>
  
        {/* Título y descripción */}
        <h3 className="text-lg font-bold mb-1 self-start  lg:max-w-96 max-w-full mt-3    break-words">{off.title}</h3>
        <p className="text-xs text-gray-500 self-start my-1 lg:max-w-96 max-w-full break-words">{off.description}</p>
  
        {/* Precio */}
        <div className="flex justify-between items-center w-full border-t mt-2 border-gray-200 pt-2">
          <Link href={`/services/${off.user_id}/${off.id}`}>More Info</Link>
          <span className="text-lg text-red-600 font-bold">{off.price_min} - {off.price_max} US$</span>
        </div>
      </div>
    )
}

