import { OportunityType } from "@/app/oportunities/page"
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { FaLaptop } from "react-icons/fa";

interface RequestCardProps {
  op: OportunityType;
}


export default function RequestCard({ op }: RequestCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
      {op.pictures && (
        <div className="mb-2 p-4 overflow-hidden">
          <Image
            src={op.pictures}
            alt="Preview Image"
            width={400} 
            height={200}
            className="rounded object-cover w-full h-48" 
          />
        </div>
      )}

      <div className="flex-1"> 
        <div className="flex justify-between items-start border-t border-gray-200 pt-2">
          <div className="flex items-center mt-2">
            {op.avatar ? (
              <Image
                src={op.avatar}
                alt="user img"
                width={25}
                height={25}
                className="rounded-full avatar-nav"
              />
            ) : (
              <FaUser size={25} className="rounded-full" />
            )}
            <span className="text-md ml-1">{op.user_handle}</span>
          </div>
          <span className="text-sm text-gray-500 mt-3">{op.profession}</span>
        </div>

        <h3 className="text-md font-bold mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{op.title}</h3>
        <p className="text-xs text-gray-500 mt-1 mb-2 overflow-hidden text-ellipsis whitespace-normal" style={{ maxHeight: '4.5em' }}>
          {op.description}
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-2">
        <span className="text-sm flex items-center font-semibold">
          <FaLaptop className="mr-1" />Remote: {op.remote}
        </span>
        <span className="text-md font-bold">
          {op.price_min} - {op.price_max} US$
        </span>
      </div>
      <Link href={`/oportunities/${op.user_id}/${op.id}`} className="mt-4 text-center text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm font-semibold">
          More Info
      </Link>
    </div>
  )
}

