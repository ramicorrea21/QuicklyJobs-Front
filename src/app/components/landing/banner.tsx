import Link from "next/link"
export default function Banner(){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center p-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Connecting You to Professional Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-xl mx-auto">
            Discover experts ready to deliver on-demand. Simplify your service needs with our platform.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/request-service" className="border border-purple-500 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg  hover:bg-white hover:text-purple-500 transition duration-300">
              Request a Service
            </Link>
            <Link href="/offer-service" className=" border border-black text-black px-3 py-2 rounded-md  bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 hover:bg-black hover:text-white">
                Offer a Service
            </Link>
          </div>
        </div>
      </div>
    )
}