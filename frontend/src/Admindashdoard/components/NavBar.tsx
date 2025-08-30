import React, { useState } from 'react';
import { FaBars, FaUser, FaCog, FaLock, FaSignOutAlt,FaBell } from 'react-icons/fa';

type HandleSideBar ={
  handleSideBar : () => void
}

const NavBar: React.FC <HandleSideBar>= ({ handleSideBar }) => {
  const [showAdminIcons, setShowAdminIcons] = useState(false);

  function handleAdminIcons() {
    setShowAdminIcons(!showAdminIcons);
  }

  return (
    <>
      <div className="relative z-50">
        <div className="bg-gray-800 text-white p-4 flex justify-between
         items-center fixed left-0 top-0 right-0 z-[100]">
          <div className="flex items-center space-x-4">
            <div className="mt-1 cursor-pointer">
              <FaBars onClick={handleSideBar} size={24} />
            </div>
            <h2 className="lg:text-xl sm:text-lg">Hi Admin</h2>
          </div>
          <div className=" flex items-center space-x-4 text-lg pr-2">
              <FaBell size={24}/>
            <FaUser onClick={handleAdminIcons} size={24} />
          </div>
        </div>

        <div
            className={`absolute top-[45px] 
              right-[10px]
              bg-blue-700 p-6 rounded 
              shadow-lg w-[250px]  text-white lg:text-lg sm:text-sm font-serif 
              ${showAdminIcons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} 
              transition-all duration-300 z-[150]`}          
        >
          <div className='bg-gray-800 p-3 mb-2 rounded'>
              <p>Profile</p>
          </div>
            <ul className="space-y-2 text-center">
              <li className="flex items-center gap-2  hover:bg-gray-700 p-1 rounded cursor-pointer">
                <FaCog  size={15}/> Setting
              </li>
              <li className="flex items-center gap-2  hover:bg-gray-700 p-1 rounded cursor-pointer">
                <FaLock size={15} /> Change Password
              </li>
              <li className="flex items-center gap-2 justify-center bg-gray-800 hover:bg-gray-700 p-1 rounded cursor-pointer">
                <FaSignOutAlt size={15} /> Logout
              </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
