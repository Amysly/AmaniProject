import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register, reset } from "../../feature/auth/authslice";
import { getDepartments } from "../../feature/departments/departmentSlice";

type AddUserProps = {
  onClose: () => void;
};

type FormInfo = {
  name: string;
  email: string;
  level: string;
  matriNumber: string;
  staffId: string;
  department: string;
  password: string;
  password2: string;
  role: string;
};

const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormInfo>({
    name: "",
    email: "",
    level: "",
    matriNumber: "",
    staffId: "",
    department: "",
    password: "",
    password2: "",
    role: "",
  });

  const { name, email, password, password2, level, department, matriNumber, staffId, role } =
    formData;

  const dispatch = useAppDispatch();

  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );
  const { departments } = useAppSelector((state) => state.departments);

  // Fetch departments
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  // Handle success and error
  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success("User created successfully");
      onClose(); // Close modal
      setFormData({
        name: "",
        email: "",
        level: "",
        matriNumber: "",
        staffId: "",
        department: "",
        password: "",
        password2: "",
        role: "",
      });
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, onClose]);

  // Handle submit
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== password2)
      return toast.error("Passwords do not match");

    if (!role)
      return toast.error("Please select a role");

    const userData = {
      name,
      email,
      password,
      role,
      department,
      level: role === "student" ? level : "",
      matriNumber: role === "student" ? matriNumber.toUpperCase() : "",
      staffId: role === "lecturer" || role === "admin" ? staffId.toUpperCase() : "",
    };

    dispatch(register(userData));
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative z-50 bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          <FaTimes size={20} />
        </button>

        <h1 className="mb-8 text-center text-3xl font-semibold">Add User</h1>

        <form onSubmit={handleAddUser} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          {/* Role select — FIXED */}
          <select
            name="role"
            value={role}
            onChange={handleChange}
            className="border rounded p-3"
            required
          >
            <option value="">-- Select Role --</option>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>

          {/* Student fields only */}
          {role === "student" && (
            <>
              <select
                name="level"
                value={level}
                onChange={handleChange}
                className="border rounded p-3"
                required
              >
                <option value="">Select Level</option>
                <option value="100 level">100 level</option>
                <option value="200 level">200 level</option>
                <option value="300 level">300 level</option>
                <option value="400 level">400 level</option>
              </select>

              <input
                type="text"
                name="matriNumber"
                placeholder="Matric Number"
                value={matriNumber}
                onChange={handleChange}
                className="border rounded p-3"
                required
              />
               {/* Department */}
          <select
            name="department"
            value={department}
            onChange={handleChange}
            className="border rounded p-3"
            required
          >
            <option value="">-- Select Department --</option>
            {departments?.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
            </>
          )}

          {/* Lecturer/Admin only */}
          {(role === "lecturer" || role === "admin") && (
            <input
              type="text"
              name="staffId"
              placeholder="Staff ID"
              value={staffId}
              onChange={handleChange}
              className="border rounded p-3"
              required
            />
          )}

          {/* Passwords */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={handleChange}
            className="border rounded p-3"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded mt-2"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
