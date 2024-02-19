"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { LoginFetch } from "../lib/data";
import { useState } from "react";

export type loginInputs = {
  user_email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<loginInputs>();
  const [error, setError] = useState(false);

  const onSubmit: SubmitHandler<loginInputs> = async (data) => {
     LoginFetch(data);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1>Login Page</h1>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className="block text-sm font-medium leaging-6 text-red-500">
            Incorrect email or password
          </p>
        )}
        <label
          htmlFor="user_email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className=" sm:w-80 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="text"
            id="user_email"
            autoComplete="user_email"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="example@gmail.com"
            {...register("user_email")}
          />
        </div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className=" sm:w-80 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="password"
            id="password"
            autoComplete="off"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...register("password")}
          />
        </div>
        <div className="flex max-[300px]:flex-col flex-row">
          <button
            type="submit"
            className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
          <h3 className="mt-4 mx-2 text-sm">Don't have an account?</h3>{" "}
          <Link href="/singup">
            <h3 className="mt-4 text-sm text-indigo-600 underline max-[300px]:text-center">
              Singup
            </h3>
          </Link>
        </div>
      </form>
    </div>
  );
}
