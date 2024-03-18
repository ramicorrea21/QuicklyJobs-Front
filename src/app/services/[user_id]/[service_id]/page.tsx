export default async function Service({params: {user_id, service_id}} : {params: {service_id: number, user_id: number}}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${user_id}/${service_id}`);
    const service = await res.json()

    return(
        <div className="flex h-screen justify-center items-center">
            {service? 
            <h1>{service[0]?.title}</h1>
            : ""}
        </div>
    )
}