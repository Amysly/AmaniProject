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
import ViewDepartments from './Admindashdoard/pages/ViewDepartments';


// Student Dashboard Pages
import DashBoard from './Dashboard/components/DashBoard';
import StudentMainLayout from './Dashboard/LayoutDashboard/StudentMainLayout'
import Students from './Dashboard/pages/Students';
import Setting from './Dashboard/pages/Setting';
import StudentProfile from './Dashboard/pages/StudentProfile';

// Admin Dashboard Pages
import AdminDashBoard from './Admindashdoard/components/AdminDashBoard';
import AdminMainLayout from './Admindashdoard/Layout/AdminMainLayout';
import Users from './Admindashdoard/pages/Users';
import ResultsEntry from './Admindashdoard/pages/ResultEntry';
import Department from './Admindashdoard/pages/Department';
import PermissionsTable from './Admindashdoard/pages/PermissionTable';
import Settings from './Dashboard/pages/Setting';
import ViewResults from './Admindashdoard/pages/ViewResults';
import UserProfile from './Admindashdoard/pages/UserProfile';
import CreateCourses from './Admindashdoard/pages/CreateCourses';
import AllCourses from './Admindashdoard/pages/AllCourses';
import StudentDetail from './Admindashdoard/pages/StudentDetail';
import CourseRegistration from './Dashboard/pages/CourseRegistration';
import StudentRegisteredCourses from './Dashboard/pages/StudentRegisteredCourses';
import PrintCourseForm from './Dashboard/pages/PrintCourseForm';
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

        {/*student Dashboard Routes */}
        <Route element={<StudentMainLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/users" element={<Students />} />
          <Route path="/dashboard/setting" element={<Setting />} />
          <Route path="/course-registration" element={<CourseRegistration />} />
          <Route path="/student-course" element={<StudentRegisteredCourses />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/print-courseform" element={<PrintCourseForm />} />
        </Route>

      {/* Admin Dashboard Routes */}
        <Route element={<AdminMainLayout />}>
          <Route>
              <Route path="/admin-dashboard" element={<AdminDashBoard/>} />
              <Route path="/users" element={<Users />} />
               <Route path="/profile" element={<UserProfile />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/resultentry" element={<ResultsEntry />} />
              <Route path="/viewresults" element={<ViewResults />} />
               <Route path="/permission" element={<PermissionsTable />} />
               <Route path="/departments" element={<Department />} />
                <Route path="/all-departments" element={<ViewDepartments />} />
               <Route path="/create-courses" element={<CreateCourses/>} />
                <Route path="/all-courses" element={<AllCourses/>} />
                 <Route path="/studentdetails/:id" element={<StudentDetail/>} />
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
