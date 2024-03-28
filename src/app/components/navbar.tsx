'use client'
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { FaUser } from "react-icons/fa";
import Image from 'next/image';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface DropdownItemProps {
  href: string;
  label: string;
}


export default function Navbar() {
  const { user, logout } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const DropdownItem: React.FC<DropdownItemProps> = ({ href, label }) => (
    <Link href={href} onClick={toggleMenu} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      {label}
    </Link>
  );

  return (
    <nav className=" shadow fixed top-0 bg-white w-screen z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className='lg:hidden mr-1' onClick={toggleMenu}><GiHamburgerMenu size={20} /></div>
          <Link href="/" className="font-bold max-[340px]:text-lg text-xl text-black mr-4">
            QuicklyJobs
          </Link>
          <Link href="/services" className="text-black px-3 mt-0.5 rounded-md text-sm font-medium hidden lg:block">
            Services Offers
          </Link>
          <Link href="/oportunities" className="text-black px-3 mt-0.5 rounded-md text-sm font-medium hidden lg:block">
            Job Oportunities
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className=" hidden md:block px-3 cursor-pointer">
             {user?.profile?.avatar ? (
              <Image src={user?.profile?.avatar} alt="user img" width={25} height={10} className=" avatar-nav"/>
               ) :  <FaUser size={25} className="rounded-full mb-2" /> }
               <div className="relative">
              <button
                className="font-semibold text-xs flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
               Me
                {dropdownOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
              </button> 
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md z-10">
                  {user?.profile  == null? <DropdownItem href="/complete_profile" label="Profile" />: <DropdownItem href="/profile" label="Profile" /> }
                  <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={logout}>Logout </p>
                </div>
              )}
            </div>
            </div>
          ) :
            <Link href="/login" className="hidden md:block text-black px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
          }
          <Link href="/postoportunity" className=" hidden md:block border border-black text-black px-3 py-2 rounded-md text-sm font-medium bg-transaparent hover:bg-black hover:text-white mr-4">
            Request a service
          </Link>
          <Link href="/postservice" className="border border-black text-black px-3 py-2 rounded-md text-sm font-medium bg-transaparent hover:bg-black hover:text-white">
            Offer a service
          </Link>
        </div>
      </div>
      {openMenu && (
        <div className="absolute top-0 left-0 h-screen w-full fondo z-50 lg:hidden">
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
            <Link onClick={toggleMenu} href="/postoportunity" className="md:hidden text-black text-center w-56 py-2 text-lg border border-black px-5 my-2 rounded-md  hover:bg-black hover:text-white">
              Request a service
            </Link>
            <Link onClick={toggleMenu} href="/postservice" className="md:hidden  text-black text-center w-56 py-2 text-lg border border-black px-5 my-2 rounded-md  hover:bg-black hover:text-white">
              Offer a service
            </Link>
            {user ? (
        <div className="text-center  py-2">
          {user?.profile?.avatar ? (
            <Image src={user.profile.avatar} alt="user img" width={50} height={50} className="inline-block rounded-full mx-1"/>
          ) : (
            <FaUser size={25} className="inline-block rounded-full mb-2"/>
          )}
          <button onClick={toggleMobileDropdown} className="font-semibold text-lg">
           Me
          </button>
          
          {mobileDropdownOpen && (
            <div className="absolute left-0 right-0 mx-auto mt-2 w-48  shadow-md z-10">
              {user.profile == null ? (
                <DropdownItem href="/complete_profile" label="Complete Profile" />
              ) : (
                <DropdownItem href="/profile" label="Profile" />
              )}
              <p onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</p>
            </div>
          )}
        </div>
      ) : (
        // Si no hay usuario, muestra el botón de login
        <Link href="/login" onClick={toggleMenu} className="text-center w-full py-2 text-lg">
          Login
        </Link>
      )}
          </div>
        </div>
      )}
    </nav>
  );
}
