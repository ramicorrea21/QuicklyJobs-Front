import { User } from "../context/authContext";

    interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user : User | null
    }

    const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            {/* Aquí iría tu formulario de edición */}
            <button onClick={onClose} className="mt-3 bg-gray-200 p-2 rounded">Close</button>
        </div>
        </div>
    );
    };

    export default EditProfileModal;
