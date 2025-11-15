import React from 'react';
import { NavLink } from 'react-router-dom';

type SideBarProps ={
    showSideBar : boolean;
  }


const LinkClass = ({ isActive }:{ isActive: boolean }) =>
  isActive ? "bg-blue-500 w-full block px-4 py-2 font-serif text-1xl" 
           : "text-black font-serif text-1xl w-full block";

const SideBar: React.FC<SideBarProps> = ({ showSideBar }) => {
  return (
    <div className={`
      fixed top-0 left-0 h-screen w-64 pt-16 bg-white p-5 text-black z-50 side-bar
      transform transition-transform duration-300 ease-in-out
      ${showSideBar ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <h2 className="text-2xl font-bold mt-5">Student</h2>
      <nav className="mt-5">
        <ul>
          <li className="mt-5 mb-2">
            <NavLink to="/dashboard" className={({ isActive } :{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Dashboard
            </NavLink>
          </li>
           <li className="mt-5 mb-2">
            <NavLink to="/student-profile" className={({ isActive } :{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Profile
            </NavLink>
          </li>
          <li className="mt-3 mb-2">
            <NavLink to="/student-course" className={({ isActive } :{ isActive: boolean }) => `${LinkClass({ isActive })} 
            p-2 hover:bg-gray-700 rounded`}>
              Courses
            </NavLink>
          </li>
          <li className="mt-3 mb-2">
            <NavLink to="/course-registration" className={({ isActive }:{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Course Registration
            </NavLink>
          </li>
          <li className="mt-3 mb-2">
            <NavLink to="/my-result" className={({ isActive }:{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Results
            </NavLink>
          </li>
          <li className="mt-3 mb-2">
            <NavLink to="/payment" className={({ isActive }:{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              E-Payment
            </NavLink>
          </li>
          <li className="mt-3 mb-2">
            <NavLink to="/Academic-Calender" className={({ isActive }:{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Academic Calender
            </NavLink>
          </li>
          <li className="mt-3">
            <NavLink to="/announcement" className={({ isActive }:{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Announcements
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
