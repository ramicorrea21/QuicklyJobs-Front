export default function DetailSkeleton() {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen md:mt-0 mt-20 px-4">
        {/* Tarjeta Principal del Servicio */}
        <div className="animate-pulse bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 mb-8">
          <div className="flex flex-wrap md:flex-nowrap md:items-start">
            {/* Contenedor de Imágenes */}
            <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded-lg"></div>
            {/* Detalles del Servicio */}
            <div className="w-full md:w-1/2 p-4 space-y-6">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        {/* Sección "About" */}
        <div className="animate-pulse bg-white shadow-xl rounded-lg max-w-4xl w-full mx-auto p-4 space-y-3">
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="space-y-1 text-sm">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }
  