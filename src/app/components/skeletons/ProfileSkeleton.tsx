export default function ProfileSkeleton(){
    return(
        <div className="flex justify-center mt-20 lg:mt-40 lg:mx-0 mx-6">
      <div className="w-full max-w-6xl">
        {/* Simulación del banner púrpura */}
        <div className="bg-purple-600 rounded-t-lg h-48"></div>

        {/* Simulación de la sección de información del usuario */}
        <div className="bg-gray-300 rounded-b-lg shadow-lg mt-[-3rem] h-72 animate-pulse"></div>

        {/* Simulación de la sección 'About' */}
        <div className="bg-gray-300 rounded-lg shadow-lg mt-4 h-24 animate-pulse"></div>

        {/* Simulación de la sección 'Experience' */}
        <div className="bg-gray-300 rounded-lg shadow-lg mt-4 h-32 mb-10 animate-pulse"></div>
      </div>
    </div>
    )
}