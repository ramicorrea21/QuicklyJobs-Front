import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema } from '../validations/profileSchema'; // Asegúrate de que esta ruta sea correcta
import { User } from '../context/authContext';
import { useEffect, useState } from 'react';
import { categories, countries } from '../utils/options';
import { ProfileInputs } from '../complete_profile/page';
import Image from 'next/image';

type EditProfile = {
    first_name?: string;
    last_name?: string;
    description?: string;
    profession?: string;
    category?: string;
    phone?: string;
    available?: string; // Si se maneja como "Yes" o "No", podrías considerar usar boolean o un tipo enum específico
    city?: string;
    country?: string;
    hiring?: string;
    looking_for?: string;
    company?: string;
    role?: string;
    experience?: string;
    avatar?: File | null;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user }) => {
    const [avatarUrl, setAvatarUrl] = useState(user?.profile?.avatar || 'default_avatar_url.png');
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EditProfile>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            first_name: user?.profile?.first_name ?? '',
            last_name: user?.profile?.last_name ?? '',
            description: user?.profile?.description ?? '',
            profession: user?.profile?.profession ?? '',
            category: user?.profile?.category ?? '',
            phone: user?.profile?.phone ?? '',
            available: user?.profile?.available ?? '',
            city: user?.profile?.city ?? '',
            country: user?.profile?.country ?? '',
            hiring: user?.profile?.hiring ?? '',
            looking_for: user?.profile?.looking_for ?? '',
            company: user?.profile?.company ?? '',
            role: user?.profile?.role ?? '',
            experience: user?.profile?.experience ?? '',
        },
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<EditProfile> = async (data) => {
        const formData = new FormData();
      
        // Añade los campos del formulario al formData
        for (const [key, value] of Object.entries(data)) {
          if (value !== null) {
            formData.append(key, value);
          }
        }
      
        // Añade el archivo del avatar si el usuario seleccionó uno
        if (selectedAvatar) {
          formData.append('avatar', selectedAvatar);
        }
      
        // Ahora puedes enviar formData a tu servidor
        console.log(Array.from(formData));
        // Aquí implementarías la lógica para hacer el POST o PUT request
      };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 px-4 py-6 overflow-auto bg-black bg-opacity-50 flex justify-center items-start">
            <div className="bg-white p-5 rounded-lg w-full max-w-4xl mx-auto my-6">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <h2 className="text-xl font-semibold col-span-full">Edit Profile</h2>
                    <div className="flex flex-col items-center">
                        <Image src={avatarUrl} alt="Avatar" width={400} height={200} className="h-24 w-24 rounded-full" />
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        <label htmlFor="avatar" className="mt-2 cursor-pointer text-blue-600 hover:text-blue-800">
                            Change Avatar
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="first_name" className="text-sm font-semibold">First Name</label>
                        <input id="first_name" type="text" className={`p-2 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md`} {...register('first_name')} />
                        {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="last_name" className="text-sm font-semibold">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            className={`p-2 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('last_name')}
                        />
                        {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name?.message}</p>}
                    </div>

                    <div className="flex flex-col col-span-full">
                        <label htmlFor="description" className="text-sm font-semibold">Description</label>
                        <textarea id="description" className={`p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`} {...register('description')}></textarea>
                        {errors.description && <p className="text-red-500 text-xs">{errors.description?.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="profession" className="text-sm font-semibold">Profession</label>
                        <input
                            id="profession"
                            type="text"
                            className={`p-2 border ${errors.profession ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('profession')}
                        />
                        {errors.profession && <p className="text-red-500 text-xs">{errors.profession?.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-sm font-semibold">Category</label>
                        <select
                            id="category"
                            className={`p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('category')}
                        >
                            {categories.map((categories) => {
                                return (
                                    <option key={categories}>{categories}</option>
                                )
                            })}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs">{errors.category?.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            className={`p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('phone')}
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="available" className="text-sm font-semibold">Available to contract?</label>
                        <select
                            id="available"
                            className={`p-2 border ${errors.available ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('available')}
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        {errors.available && <p className="text-red-500 text-xs">{errors.available.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="city" className="text-sm font-semibold">City</label>
                        <input
                            id="city"
                            type="text"
                            className={`p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('city')}
                        />
                        {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="country" className="text-sm font-semibold">Country</label>
                        <select
                            id="Country"
                            className={`p-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('country')}
                        >
                            {countries.map((country) => {
                                return (
                                    <option key={country}>{country}</option>
                                )
                            })}
                        </select>
                        {errors.country && <p className="text-red-500 text-xs">{errors.country?.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="hiring" className="text-sm font-semibold">Are you looking to hire a service?</label>
                        <select
                            id="hiring"
                            className={`p-2 border ${errors.hiring ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('hiring')}
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        {errors.hiring && <p className="text-red-500 text-xs">{errors.hiring.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="looking_for" className="text-sm font-semibold">Are you looking for offering your services? *</label>
                        <select
                            id="looking_for"
                            className={`p-2 border ${errors.looking_for ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('looking_for')}
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        {errors.looking_for && <p className="text-red-500 text-xs">{errors.looking_for.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="company" className="text-sm font-semibold">Company</label>
                        <input
                            id="company"
                            type="text"
                            className={`p-2 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('company')}
                        />
                        {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="role" className="text-sm font-semibold">Role</label>
                        <input
                            id="role"
                            type="text"
                            className={`p-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('role')}
                        />
                        {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="experience" className="text-sm font-semibold">Years of Experience</label>
                        <input
                            id="experience"
                            type="text"
                            className={`p-2 border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            {...register('experience')}
                        />
                        {errors.experience && <p className="text-red-500 text-xs">{errors.experience.message}</p>}
                    </div>


                    <div className="col-span-full flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="mt-2 bg-gray-200 px-4 py-2 rounded font-semibold">
                            Close
                        </button>
                        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;






