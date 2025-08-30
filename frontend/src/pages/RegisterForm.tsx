import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../feature/auth/authslice';
import Spinner from '../components/Spinner';

interface RegisterForm{
  name: string,
  email: string,
  password: string,
  password2: string
}
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto mt-40 p-4 shadow-lg rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleForm}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleForm}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleForm}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handleForm}
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
