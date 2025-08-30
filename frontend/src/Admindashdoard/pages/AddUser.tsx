import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

type AddUserProps = {
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    alert("A user has been created!");
    onClose(); // close modal after submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        <h1 className="mb-8 text-center font-sans text-3xl">Add User</h1>

        <form
          onSubmit={handleAddUser}
          className="flex flex-col gap-4 justify-center"
        >
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
          <input
            className="border border-zinc-400 rounded-lg w-full placeholder:text-sm placeholder:font-sans p-3"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="border border-zinc-400 rounded-lg w-full placeholder:text-sm placeholder:font-sans p-3"
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-sans mt-2 transition duration-300"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
