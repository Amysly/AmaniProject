import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { uploadProfileImage, reset } from "../../feature/auth/authslice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success("Profile picture updated successfully!");
      dispatch(reset()); // reset status flags after toast
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Upload immediately
      dispatch(uploadProfileImage(file));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={user?.profileImage || "/default-avatar.png"} // fallback if no image
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
      <p className="text-gray-600">{user?.email}</p>
    </div>
  );
};

export default UserProfile;
