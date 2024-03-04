"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { LoginFetch } from "../lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export type loginInputs = {
  user_email: string;
  password: string;
};

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<loginInputs>();
  const [error, setError] = useState(false);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<loginInputs> = async (data) => {
    const loginSuccessful = await login(data.user_email, data.password); 
    if (loginSuccessful) {
      router.push('/'); 
    } else {
      setError(true); 
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-10 text-center lg:items-start lg:text-left mt-28 lg:mt-0 lg:ml-28">
      <h1 className="text-4xl lg:text-7xl xl:text-8xl font-bold mb-10">Log In to your account</h1>
      <p className="mb-2 text-xl lg:text-3xl">Don't have an account? <Link href="/singup" className="text-indigo-600 hover:underline">Singup</Link></p>
      <div className="w-12 h-1 bg-black mb-4 hidden md:block"></div>
      <p className="text-sm sm:text-xl lg:text-2xl text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.</p>
    </div>
    {/* Sección del formulario */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 mt-10">
        <div className="w-full sm:w-3/4 lg:w-1/2 bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
          {error && (
          <p className="block text-sm font-medium leaging-6 text-red-500">
            Incorrect Email or Password
          </p>
            )}
            <div>
              <label htmlFor="user_email" className="block text-sm font-bold mb-2">
                EMAIL
                </label>
              <input 
              type="email"
              id="user_email"
              autoComplete="email" 
              placeholder="example@gmail.com"
              {...register("user_email")}  
               className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                PASSWORD
                </label>
              <input 
               type="password"
               id="password" 
               placeholder="********"
               {...register("password")} 
               className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-opacity-90">Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
