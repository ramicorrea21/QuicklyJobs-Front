'use client'
import { categories } from "@/app/utils/options"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

export default function OfferForm() {
    return (
        <div className="container mx-auto my-10 p-5">
            <div className="flex justify-center">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Card del formulario */}
                    <div className="flex flex-col w-full lg:w-4/6 bg-white rounded-lg shadow-lg p-6">
                        <div className="border-b border-gray-200 pb-5 mb-6">
                            <h2 className="text-3xl font-bold mb-3">I Need...</h2>
                            <p className="text-sm text-gray-500 mb-5">Fill in the spaces commenting on what service you need</p>
                        </div>
                        <form>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">TITLE*</label>
                                    <input type="text" id="title" placeholder="Example: I need a car mechanic" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">CATEGORY*</label>
                                    <select id="category" className="block appearance-none w-full bg-white border border-gray-400 rounded shadow py-2 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline">
                                        <option>Select your category...</option>
                                        {/* Add more options here */}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">DESCRIPTION*</label>
                                <textarea id="description" placeholder="A brief description of what you do..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></textarea>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">¿REMOTE?*</label>
                                    <div className="flex items-center">
                                        <button type="button" className="bg-gray-200 rounded-full px-4 py-1 mr-2 focus:outline-none">yes</button>
                                        <button type="button" className="bg-gray-200 rounded-full px-4 py-1 focus:outline-none">no</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label htmlFor="price-range" className="block text-gray-700 text-sm font-bold mb-2">PRICE RANGE*</label>
                                    <div className="flex">
                                        <input type="text" id="min-price" placeholder="0" className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <input type="text" id="max-price" placeholder="299" className="shadow appearance-none border-t border-b border-r rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold mb-2">IMAGES*</label>
                                    <input type="file" id="file-upload" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <p className="text-xs text-gray-500 mt-1">oferta.jpg</p>
                                </div>
                            </div>

                            {/* Add any other form fields or buttons here */}
                        </form>
                    </div>

                    {/* Card de vista previa */}
                    <div className="w-full lg:w-2/6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-bold mb-3">Your Service</h3>
                            {/* Aquí iría la vista previa de la información del servicio */}
                            {/* ... */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}