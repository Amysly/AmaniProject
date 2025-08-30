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
import Students from './Dashboard/pages/Students';
import Setting from './Dashboard/pages/Setting';

// Admin Dashboard Pages
import AdminDashBoard from './Admindashdoard/components/AdminDashBoard';
import AdminMainLayout from './Admindashdoard/Layout/AdminMainLayout';
import Users from './Admindashdoard/pages/Users';
import ResultsEntry from './Admindashdoard/pages/ResultsEntry';
import Department from './Admindashdoard/pages/Department';
import PermissionsTable from './Admindashdoard/pages/PermissionTable';
import RolesForm from './Admindashdoard/pages/RolesForm';
import Settings from './Dashboard/pages/Setting';
import ViewResults from './Admindashdoard/pages/ViewResults';


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
          <Route path="/dashboard/users" element={<Students />} />
          <Route path="/dashboard/setting" element={<Setting />} />
        </Route>

      {/* Admin Dashboard Routes */}
        <Route element={<AdminMainLayout />}>
          <Route>
              <Route path="/" element={<AdminDashBoard/>} />
              <Route path="/users" element={<Users />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/resultentry" element={<ResultsEntry />} />
              <Route path="/viewresults" element={<ViewResults />} />
               <Route path="/assign-roles" element={<RolesForm />} />
               <Route path="/permission" element={<PermissionsTable />} />
               <Route path="/departments" element={<Department />} />
               <Route path="/courses" element={<Courses/>} />
            </Route>
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
