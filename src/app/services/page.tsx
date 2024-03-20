'use client'
import ServiceCard from "../components/catalogs/serviceCard"
import { useEffect, useState } from "react"

export type OfferType = {
    id : number,
    title: string,
    description: string,
    pictures: string,
    avatar: string,
    price_min: string,
    price_max: string,
    user_id: number,
    category: string,
    is_remote: string,
    user_handle: string
    profession: string,
}



export default function Services() {
    const [offers, setOffers] = useState<OfferType[]>([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/services`)
            .then(res => res.json())
            .then(data => setOffers(data))
    }, [])

    return (
        <div className="container mx-auto px-4 flex justify-center h-screen items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {offers?.map((off : OfferType, index : number) =>{
                    return(
                        <ServiceCard key={index}  off={off} />
                    )
                })}  
            </div> 
        </div>
    )
}