'use client'
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { FaUser } from "react-icons/fa";


export default function Navbar() {
  const { user, logout } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }


  return (
    <nav className=" shadow fixed top-0 w-screen">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className='lg:hidden mr-1' onClick={toggleMenu}><GiHamburgerMenu size={20} /></div>
          <Link href="/" className="font-bold max-[340px]:text-lg text-xl text-black mr-4">
            QuicklyJobs
          </Link>
          <Link href="/services" className="text-black px-3 py-2 rounded-md text-sm font-medium hidden lg:block">
            Services Offers
          </Link>
          <Link href="/oportunities" className="text-black px-3 py-2 rounded-md text-sm font-medium hidden lg:block">
            Job Oportunities
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex px-3 py-2 cursor-pointer">
              <FaUser size={20} className='hidden md:block' />
              <Link href="/profile" className="hidden md:block  text-black rounded-md text-sm font-medium">
              {user?.user.user_handle}
            </Link>
            </div>
          ) :
            <Link href="/login" className="hidden md:block text-black px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
          }
          <Link href="/postoportunity" className=" hidden md:block border border-black text-black px-3 py-2 rounded-md text-sm font-medium bg-transaparent hover:bg-black hover:text-white mr-4">
            Request a service
          </Link>
          <Link href="/postservice" className="border border-black text-black px-3 py-2 rounded-md  bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 hover:bg-black hover:text-white">
            Offer a service
          </Link>
        </div>
      </div>
      {openMenu && (
        <div className="absolute top-0 left-0 h-screen w-full bg-white z-50 lg:hidden">
          <div className='flex px-6 py-3 mt-1'>
            <div className='lg:hidden mr-1 ' onClick={toggleMenu}><IoMdClose size={30} /></div>
            <Link onClick={toggleMenu} href="/" className="font-bold max-[340px]:text-lg text-xl text-black">
              QuicklyJobs
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <Link onClick={toggleMenu} href="/services" className="text-black py-2 text-lg">
              Services Offers
            </Link>
            <Link onClick={toggleMenu} href="/oportunities" className="text-black py-2 text-lg">
              Job Oportunities
            </Link>
            <Link onClick={toggleMenu} href="/postoportunity" className="md:hidden text-black text-center w-56 py-2 text-lg border border-black px-5 my-2 rounded-md bg-white hover:bg-black hover:text-white">
              Request a service
            </Link>
            <Link onClick={toggleMenu} href="/postservice" className="md:hidden  text-white w-56 text-center text-lg bg-purple-500 px-5 py-2 my-2 rounded-md hover:bg-white hover:text-purple-500">
              Offer a service
            </Link>
            {user ?
              <div className="flex py-2 " onClick={toggleMenu}>
              <FaUser size={20} className='md:hidden' />
              <Link href='/profile' className="md:hidden  text-black text-lg">
                {user.user.user_handle}
              </Link>
              </div>
              : <Link onClick={toggleMenu} href="/login" className="md:hidden  text-black py-2 text-lg">
                Log In
              </Link>}
          </div>
        </div>
      )}
    </nav>
  );
}
