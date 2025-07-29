import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

// Public Pages
import HomePage from './components/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import RegisterForm from './pages/RegisterForm';
import Login from './pages/Login';
import MainLayout from './Layout/MainLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';

// Student Dashboard Pages
import DashBoard from './Dashboard/components/DashBoard';
import StudentMainLayout from './Dashboard/LayoutDashboard/StudentMainLayout'
import Users from './Dashboard/pages/Users';
import Setting from './Dashboard/pages/Setting';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="courses" element={<Courses />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<StudentMainLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/setting" element={<Setting />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
