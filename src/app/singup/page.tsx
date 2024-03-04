"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validations/userSchema";
import { Register } from "../lib/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Inputs = {
  user_email: string;
  user_handle: string;
  password: string;
  confirm_password: string
};

export default function Singup() {
  const router = useRouter();

  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let status = await Register(data)
    if (status == 201) {
      router.push('/login')
    } else {
      setError(true)
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-10 text-center lg:items-start lg:text-left mt-28 lg:mt-0 lg:ml-28">
      <h1 className="text-4xl lg:text-7xl xl:text-8xl font-bold mb-4">Create New Account</h1>
      <p className="mb-2 text-xl lg:text-3xl">Already Registered? <Link href="/login" className="text-indigo-600 hover:underline">Login</Link></p>
      <div className="w-12 h-1 bg-black mt-20 mb-4 hidden md:block"></div>
      <p className="text-sm sm:text-xl lg:text-2xl text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.</p>
    </div>
    {/* Sección del formulario */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 mt-10">
        <div className="w-full sm:w-3/4 lg:w-1/2 bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
          {error && (
          <p className="block text-sm font-medium leaging-6 text-red-500">
            Username or email is already in use
          </p>
            )}
            <div>
              <label htmlFor="user_email" className="block text-sm font-bold mb-2">
                EMAIL
                   <p className="block text-sm font-medium leaging-6 text-red-500">
                          {errors.user_email?.message}
                    </p>
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
              <label htmlFor="user_handle" className="block text-sm font-bold mb-2">
                  USERNAME
                  <p className="block text-sm font-medium leaging-6 text-red-500">
                       {errors.user_handle?.message}
                  </p>  
                </label>
              <input 
              type="text"
              id="user_handle"
              autoComplete="user_handle"
              placeholder="example123"
              {...register("user_handle")}
               className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                PASSWORD
                <p className="block text-sm font-medium leaging-6 text-red-500">
                     {errors.password?.message}
                  </p>
                </label>
              <input 
               type="password"
               id="password" 
               placeholder="********"
               {...register("password")} 
               className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-bold mb-2">
                REPEAT PASSWORD
                <p className="block text-sm font-medium leaging-6 text-red-500">
                     {errors.confirm_password?.message}
                  </p>
                </label>
              <input type="password"
               id="repeat-password" 
               placeholder="********" 
               {...register("confirm_password")} 
               className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-opacity-90">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

