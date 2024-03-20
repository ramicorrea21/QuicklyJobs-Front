'use client'
import RequestCard from "../components/catalogs/requestCard"
import { useEffect, useState } from "react"

export type OportunityType={
    id: number,
    title : string,
    description:string,
    pictures:string,
    avatar:string,
    price_min: string,
    price_max:string,
    user_id: number,
    category:string,
    remote: string,
    user_handle: string,
    profession : string
}


export default function Page(){
    const [oportunities, setOportunities] = useState<OportunityType[]>([])

  useEffect(() =>{
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests`)
        .then(res => res.json())
        .then(data => setOportunities(data))
  }, [])

    
    return(
        <div className="container mx-auto px-4 flex justify-center h-screen items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {oportunities?.map((op : OportunityType, index : any) =>{
                    return(
                        <RequestCard key={index}  op={op} />
                    )
                })}               
            </div>
           
        </div>
    )
}