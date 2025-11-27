import React, { useState, useEffect } from "react";
import { updateUser, reset } from "../../feature/auth/authslice";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type UpdatedUser = {
  name: string;
  email: string;
};

interface UpdateUserProps {
  user: { _id: string; name: string; email: string };
  onClose: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState<UpdatedUser>({
    name: user.name,
    email: user.email,
  });

  const { name, email } = formData;
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success("User updated successfully!");
      onClose(); // close modal after success
    }

    dispatch(reset());
  }, [isError, isSuccess, message, onClose, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { name, email };

    dispatch(
      updateUser({
        _id: user._id,
        updatedData,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-50 bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          <FaTimes size={20} />
        </button>
        <h1 className="mb-8 text-center font-sans text-3xl">Edit User</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
          <input
            className="border border-zinc-400 rounded-lg w-full placeholder:text-sm placeholder:font-sans p-3"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="border border-zinc-400 rounded-lg w-full placeholder:text-sm placeholder:font-sans p-3"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-sans mt-2 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
