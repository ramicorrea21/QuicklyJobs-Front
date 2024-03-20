import { OfferType } from "@/app/services/page";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { FaLaptop } from "react-icons/fa";
interface RequestCardProps {
    off: OfferType;
}


export default function RequestCard({ off }: RequestCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
      {off.pictures && (
        <div className="mb-2 p-4 overflow-hidden">
          <Image
            src={off.pictures}
            alt="Preview Image"
            width={400} // Establece el tamaño que desees
            height={200}
            className="rounded object-cover w-full h-48" // Define una altura fija para todas las imágenes
          />
        </div>
      )}

      <div className="flex-1"> {/* Asegura que este div ocupe todo el espacio disponible */}
        <div className="flex justify-between items-start border-t border-gray-200 pt-2">
          <div className="flex items-center mt-2">
            {off.avatar ? (
              <Image
                src={off.avatar}
                alt="user img"
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              <FaUser size={25} className="rounded-full" />
            )}
            <span className="text-md ml-1">{off.user_handle}</span>
          </div>
          <span className="text-sm text-gray-500">{off.profession}</span>
        </div>

        <h3 className="text-md font-bold mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{off.title}</h3>
        <p className="text-xs text-gray-500 mt-1 mb-2 overflow-hidden text-ellipsis whitespace-normal" style={{ maxHeight: '4.5em' }}>
          {off.description}
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-2">
        <span className="text-sm flex items-center font-semibold">
          <FaLaptop className="mr-1" />Remote: {off.is_remote}
        </span>
        <span className="text-md font-bold">
          {off.price_min} - {off.price_max} US$
        </span>
      </div>
      <Link href={`/services/${off.user_id}/${off.id}`} className="mt-4 text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm font-semibold">
          More Info
      </Link>
    </div>
  );
}

