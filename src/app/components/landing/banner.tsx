import Link from "next/link";
export default function Banner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
          Connecting You to Professional Services
        </h1>
        <p className="text-base md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 mx-auto max-w-md md:max-w-xl">
          Discover experts ready to deliver on-demand. Simplify your service needs with our platform.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 w-full md:w-auto">
          <Link href="/postoportunity" className="text-center border border-black text-black px-6 py-3 rounded-md text-md font-medium bg-transparent hover:bg-black hover:text-white w-full md:w-auto">
            Request a service
          </Link>
          <Link href="/postservice" className="text-center border border-black text-black px-6 py-3 rounded-md text-md font-medium bg-transparent hover:bg-black hover:text-white w-full md:w-auto">
            Post your service
          </Link>
        </div>
      </div>
    </div>
  );
}
