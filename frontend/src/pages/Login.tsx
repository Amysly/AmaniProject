import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import {reset, login } from '../feature/auth/authslice';


const Login: React.FC = () => {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

     const { email, password} = formData;

   const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
  
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
      const userData = {
        email,
        password
      }
      dispatch(login(userData))
  
    };

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
        <div className="max-w-md mx-auto mt-40 p-4 shadow-lg rounded bg-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Login
            </button>
          </form>
        </div>
  )
}

export default Login
