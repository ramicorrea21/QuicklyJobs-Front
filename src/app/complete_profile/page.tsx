'use client'
import Image from 'next/image';
import { FaUserCircle } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../validations/profileSchema';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export type ProfileInputs = {
    first_name: string,
    last_name: string,
    description: string,
    address: string,
    profession: string,
    category: string,
    phone: string,
    country: string,
    city: string,
    province: string,
    avatar: FileList | null;
}

export default function CompleteProfile() {
    const { postProfile } = useAuth();
    const { user } = useAuth()
    const router = useRouter()
    const [profile, setProfile] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProfileInputs>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        if(profile == true){
            router.push('/profile')
        }
    }, [profile])

    const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            if (key !== 'avatar' && value !== null) {
                formData.append(key, String(value));
            }
        }

        if (data.avatar && data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0], data.avatar[0].name);
        }

        try {
            const status = await postProfile(formData);
            if (status === 201) {
                setProfile(true)
            }
        } catch (error) {
            console.error('Error posting profile:', error);
        }
    };


    return (
        <div className="min-h-screen  flex justify-center items-center md:mt-8">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl mx-auto mt-20">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-semibold mb-2">Complete your Profile</h2>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        The information box with an asterisk (*) must be filled out and it will be displayed publicly on your profile.
                    </p>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-20 h-20 bg-purple-300 rounded-full flex items-center justify-center mb-3 relative cursor-pointer">
                            <input
                                type="file"
                                {...register('avatar')}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                style={{ borderRadius: '50%' }}
                            />
                            <FaUserCircle size={40} className="text-gray-700" />
                            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                                <p className="text-white text-xs">Profile Picture</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                                    First Name*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.first_name?.message}
                                    </p>
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="first_name" type="text" placeholder="Jane" {...register("first_name")} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                                    Last Name*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.last_name?.message}
                                    </p>
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="last_name" type="text" placeholder="Doe" {...register("last_name")} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                    Description*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.description?.message}
                                    </p>
                                </label>
                                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="description" placeholder="A brief description of what you do..."{...register("description")}></textarea>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profession">
                                    Profession*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.profession?.message}
                                    </p>
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="profession" type="text" placeholder="Web Developer" {...register("profession")} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                                    Category*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.category?.message}
                                    </p>
                                </label>
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="category" {...register("category")}>
                                    <option>Technology</option>
                                    <option>Marketing</option>
                                    <option>Design</option>
                                    {/* ... otras opciones ... */}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                                    Phone*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.phone?.message}
                                    </p>
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    id="phone" type="tel" placeholder="+123456789" {...register("phone")} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                                    Country*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.country?.message}
                                    </p>
                                </label>
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="country" {...register("country")}>
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    {/* ... otras opciones ... */}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                                    City*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.city?.message}
                                    </p>
                                </label>
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="city" {...register("city")}>
                                    <option>New York</option>
                                    <option>Toronto</option>
                                    <option>Londres</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Province">
                                    Province*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">
                                        {errors.province?.message}
                                    </p>
                                </label>
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="Province" {...register("province")}>
                                    <option>New York</option>
                                    <option>Toronto</option>
                                    <option>Londres</option>
                                </select>
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 mt-6">
                            <div className="w-full px-3">
                                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
