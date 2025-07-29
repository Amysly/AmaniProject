import React, { useState} from 'react';
import { FaBars, FaUser } from 'react-icons/fa';

type HandleSideBar ={
  handleSideBar : () => void
}

const NavBar: React.FC<HandleSideBar>= ({ handleSideBar }) => {
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
            <h2 className="lg:text-xl sm:text-lg">Hi Student</h2>
          </div>
          <div className="text-lg pr-2">
            <FaUser onClick={handleAdminIcons} size={24} />
          </div>
        </div>

        <div
            className={`absolute top-[45px] 
              right-[10px]
              bg-blue-500 p-2 rounded 
              shadow-lg w-[150px] text-center text-white lg:text-lg sm:text-sm font-serif 
              ${showAdminIcons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} 
              transition-all duration-300 z-[150]`}          
        >
          <ul className="space-y-2">
            <li className="border-b hover:bg-gray-700 p-1 rounded cursor-pointer">Profile</li>
            <li className="border-b hover:bg-gray-700 p-1 rounded cursor-pointer">Setting</li>
            <li className="border-b hover:bg-gray-700 p-1 rounded cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
