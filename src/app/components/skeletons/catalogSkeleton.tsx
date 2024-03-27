export default function CatalogSkeleton() {
    // Determina cuántas tarjetas de esqueleto quieres mostrar
    const skeletonCards = Array(6).fill(0);
  
    return (
      <div className="container mx-auto mt-20 p-4">
        <h1 className="text-center text-2xl my-6">Services Offers</h1>
        <div className="flex flex-wrap">
          {/* Sidebar esqueleto */}
          <aside className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0 animate-pulse">
            <div className="bg-white p-6 shadow rounded space-y-4">
              <div className="bg-gray-300 h-10 rounded"></div>
              <div className="bg-gray-300 h-6 rounded"></div>
              <div className="bg-gray-300 h-6 rounded"></div>
              <div className="bg-gray-300 h-6 rounded"></div>
            </div>
          </aside>
  
          {/* Esqueleto principal para tarjetas de servicio */}
          <main className="w-full lg:w-3/4 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skeletonCards.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }