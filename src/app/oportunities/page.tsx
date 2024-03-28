'use client'
import RequestCard from "../components/catalogs/requestCard"
import { useEffect, useState } from "react"
import { categories } from "../utils/options"
import CatalogSkeleton from "../components/skeletons/catalogSkeleton"
export type OportunityType = {
    id: number,
    title: string,
    description: string,
    pictures: string,
    avatar: string,
    price_min: string,
    price_max: string,
    user_id: number,
    category: string,
    remote: string,
    user_handle: string,
    profession: string
}


export default function Page() {
    const [oportunities, setOportunities] = useState<OportunityType[]>([])
    const [categoryFilter, setCategoryFilter] = useState('');
    const [remoteFilter, setRemoteFilter] = useState('');
    const [priceMinFilter, setPriceMinFilter] = useState('');
    const [priceMaxFilter, setPriceMaxFilter] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests`)
            .then(res => res.json())
            .then(data => setOportunities(data))
    }, [])

    const filteredOportunities = oportunities.filter((op) => {
        const matchesCategory = categoryFilter ? op.category === categoryFilter : true;
        const matchesRemote = remoteFilter ? op.remote === remoteFilter : true;
        const matchesPrice = (priceMinFilter ? parseFloat(op.price_min) >= parseFloat(priceMinFilter) : true) &&
            (priceMaxFilter ? parseFloat(op.price_max) <= parseFloat(priceMaxFilter) : true);

        return matchesCategory && matchesRemote && matchesPrice;
    });

    if (oportunities.length === 0) {
      return <CatalogSkeleton />;
    } 

    return (
        <>
            <div className="container mx-auto mt-20 p-4 ">
              <h1 className="text-center text-2xl my-6">Job Oportunities</h1>
        <div className="flex flex-wrap">
          <aside className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
            <div className="bg-white p-6 shadow rounded">
              <div className="mb-4">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value=''>Select Category</option>
                  {categories.map((cat) =>{
                    return(
                        <option key={cat}>{cat}</option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={remoteFilter === 'Yes'}
                    onChange={(e) => setRemoteFilter(e.target.checked ? 'Yes' : '')}
                  />
                  <span>Remote Only</span>
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={priceMinFilter}
                  onChange={(e) => setPriceMinFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Max Price"
                  value={priceMaxFilter}
                  onChange={(e) => setPriceMaxFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </aside>
  
          {/* Contenedor principal para las tarjetas */}
          <main className="w-full lg:w-3/4 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOportunities.length > 0 ? (
              filteredOportunities.map((op, index) => (
                <RequestCard key={index} op={op} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No se encontraron coincidencias.
              </div>
            )}
          </div>
        </main>
        </div>
      </div>
        </>
    )
}