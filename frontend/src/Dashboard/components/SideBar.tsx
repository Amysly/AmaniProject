import React from 'react';
import { NavLink } from 'react-router-dom';

type SideBarProps ={
    showSideBar : boolean;
  }


const LinkClass = ({ isActive }:{ isActive: boolean }) =>
  isActive ? "bg-blue-500 px-4 py-2 font-serif text-2xl rounded" 
           : "text-white font-serif text-2xl";

const SideBar: React.FC<SideBarProps> = ({ showSideBar }) => {
  return (
    <div className={`
      fixed top-0 left-0 h-screen w-64 pt-16 bg-gray-900 p-5 text-white z-50
      transform transition-transform duration-300 ease-in-out
      ${showSideBar ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <h2 className="text-2xl font-bold mt-10">Admin Dashboard</h2>
      <nav className="mt-10">
        <ul>
          <li className="mt-5 mb-5">
             <NavLink to="/" className={({ isActive } :{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              HOME
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive } :{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Dashboard
            </NavLink>
          </li>
          <li className="mt-5 mb-5">
            <NavLink to="/users" className={({ isActive } :{ isActive: boolean }) => `${LinkClass({ isActive })} 
            p-2 hover:bg-gray-700 rounded`}>
              Users
            </NavLink>
          </li>
          <li className="mt-5 mb-5">
            <NavLink to="/setting" className={({ isActive }:{ isActive: boolean }) => `${LinkClass({ isActive })}
             p-2 hover:bg-gray-700 rounded`}>
              Setting
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
