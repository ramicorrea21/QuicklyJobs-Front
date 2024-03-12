'use client'
import { categories } from "@/app/utils/options"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from "@/app/validations/postSchema";
import Image from "next/image";
import { useAuth } from "@/app/context/authContext";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'


export type postInputs = {
    title: string,
    description: string,
    remote: string,
    category: string,
    price_min: string,
    price_max: string,
    images: FileList | null
}

export default function RequestForm() {
    const router = useRouter()

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [posted, setPosted] = useState(false)

    const { user, PostService } = useAuth()

    const {
        register, handleSubmit, setValue, watch, formState: { errors },
    } = useForm<postInputs>({ resolver: zodResolver(postSchema) })



    const title = watch('title')
    const images = watch('images')
    const description = watch('description')
    const price_min = watch('price_min')
    const price_max = watch('price_max')

    useEffect(() => {
        if (images && images.length > 0) {
            const file = images[0];
            const imagePreviewUrl = URL.createObjectURL(file);
            setPreviewImage(imagePreviewUrl);
            return () => {
                URL.revokeObjectURL(imagePreviewUrl);
            };
        }
    }, [images]);

    useEffect(() =>{
        if(posted){
            Swal.fire({
                title: "Good job!",
                text: "You posted a request!",
                icon: "success"
              });
            router.push('/services')
        }
    }, [posted])

    const onSubmit: SubmitHandler<postInputs> = async (data) => {
       const formData = new FormData();

       for(const [key, value] of Object.entries(data)){
        if(key !== 'images' && value !== null){
            formData.append(key, String(value))
        }
       }

       if(data.images && data.images.length > 0){
        formData.append('images', data.images[0], data.images[0].name)
       }

       try {
        const status = await PostService(formData)
        if(status === 201){
            setPosted(true)
        }
       } catch (error) {
        console.error('Error posting request', error)
       }


    }



    return (
        <div className="container mx-auto my-10 p-5">
            <div className="flex justify-center">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Card del formulario */}
                    <div className="flex flex-col w-full lg:w-4/6 bg-white rounded-lg shadow-lg p-6">
                        <div className="border-b border-gray-200 pb-5 mb-6">
                            <h2 className="text-3xl font-bold mb-3">I Offer.</h2>
                            <p className="text-sm text-gray-500 mb-5">Fill in the spaces commenting on what service you offer</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                        TITLE*
                                        <p className="block text-sm font-medium leaging-6 text-red-500">{errors.title?.message}</p>
                                    </label>
                                    <input type="text" id="title" {...register('title')} placeholder="Example: I need a car mechanic" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                                        CATEGORY*
                                        <p className="block text-sm font-medium leaging-6 text-red-500">{errors.category?.message}</p>
                                    </label>
                                    <select id="category" {...register('category')} className="block appearance-none w-full bg-white border border-gray-400 rounded shadow py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
                                        <option>Select your category...</option>
                                        {categories.map((cat) => {
                                            return (
                                                <option key={cat}>{cat}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                    DESCRIPTION*
                                    <p className="block text-sm font-medium leaging-6 text-red-500">{errors.description?.message}</p>
                                </label>
                                <textarea id="description" {...register('description')} placeholder="A brief description of what you do..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></textarea>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        REMOTE*
                                        <p className="block text-sm font-medium leaging-6 text-red-500">{errors.remote?.message}</p>
                                    </label>
                                    <select  {...register('remote')} className="block appearance-none w-full bg-white border border-gray-400 rounded shadow py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="price-range" className="block text-gray-700 text-sm font-bold mb-2">
                                        PRICE RANGE*
                                        <p className="block text-sm font-medium leaging-6 text-red-500">{errors.price_max?.message}</p>
                                        <p className="block text-sm font-medium leaging-6 text-red-500">{errors.price_min?.message}</p>
                                    </label>
                                    <div className="flex">
                                        <input type="number" maxLength={6}  {...register('price_min')} id="min-price" placeholder="0" className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <input type="number" maxLength={6}  id="max-price" {...register('price_max')} placeholder="299" className="shadow appearance-none border-t border-b border-r rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">
                                        IMAGES*
                                        <p className="block text-sm font-medium leaging-6 text-red-500">{errors.images?.message}</p></label>
                                    <input type="file" id="file-upload" {...register('images')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <p className="text-xs text-gray-500 mt-1">oferta.jpg</p>
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

                    {/* Card de vista previa */}
                    <div className="w-full lg:w-2/6">
                        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                                {previewImage && (
                                    <div className="mb-4 p-4 border-b border-gray-200 w-full">
                                        <Image
                                            src={previewImage}
                                            alt="Preview Image"
                                            width={400} // Establece el tamaño que desees
                                            height={200}
                                            className="rounded"
                                        />
                                    </div>
                                )}
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center">
                                    <div className="flex items-start">
                                        {user?.profile?.avatar ? (
                                            <Image
                                                src={user?.profile?.avatar}
                                                alt="user img"
                                                width={25}
                                                height={25} // Adjusted for aspect ratio
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <FaUser size={25} className="rounded-full mb-2" />
                                        )}
                                        <span className="text-md ml-1">{user?.user?.user_handle}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-yellow-400">9.9</span>
                                    <span className="text-xs text-gray-500">(999 users)</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-1 self-start  lg:max-w-96 max-w-full    break-words">{title}</h3>
                            <p className="text-xs text-gray-500 self-start my-1 lg:max-w-96 max-w-full break-words">{description}</p>
                            <div className="flex justify-end items-center w-full  border-t mt-2 border-gray-200">
                                <span className="text-lg text-red-600 font-bold">{price_min} - {price_max} US$</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}