"use client";
import { FcBinoculars } from "react-icons/fc";
import { IoMdMenu } from "react-icons/io";
import {useState} from "react";
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);


  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  }



  return (
    <nav className="bg-gray-900 text-white fixed w-screen top-0 z-10 mx-auto  px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between ">
        <div className="max-sm:block hidden">
          <IoMdMenu size={40} className="cursor-pointer" onClick={toggleMenu} />
        </div>
        <div className="max-sm:block hidden">
            <Link href="/"><FcBinoculars size={40} className="cursor-pointer"  /></Link>
        </div>

        <div className="sm:flex hidden space-x-2 md:space-x-8  ">
        <Link href="/"><FcBinoculars size={40} className="cursor-pointer"  /></Link>
          <p className="hover:bg-gray-700 hover:text-white rounded-md px-1 md:px-3 py-2 cursor-pointer">
            Home
          </p>
          <p className="hover:bg-gray-700 hover:text-white rounded-md px-1 md:px-3  py-2 cursor-pointer">
            Services
          </p>
          <p className="hover:bg-gray-700 hover:text-white rounded-md px-1 md:px-3  py-2 cursor-pointer">
            Oportunities
          </p>
        </div>
        <div className="flex text-white">
          <Link href='/login'>
            <p className="hover:bg-gray-700 hover:text-white rounded-md  py-2 px-2 cursor-pointer">Login</p>
          </Link>
        </div>
      </div>
      {openMenu && (
        <div className="w-full absolute block sm:hidden left-0 bg-gray-900 px-1 pb-3">
          <p className="hover:bg-gray-700 hover:text-white rounded-md py-2 px-2 cursor-pointer">
            Home
          </p>
          <p className="hover:bg-gray-700 hover:text-white rounded-md  py-2 px-2 cursor-pointer">
            Services
          </p>
          <p className="hover:bg-gray-700 hover:text-white rounded-md  py-2 px-2  cursor-pointer">
            Oportunities
          </p>
        </div>
      )}
    </nav>
  );
}
