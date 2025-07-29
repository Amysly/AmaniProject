import React,{useState} from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';


const MainLayout: React.FC= () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  
    function handleSideBar() {
      setShowSideBar(!showSideBar);
    }
  return (
    <>
<div className="flex h-screen">
  <SideBar showSideBar={showSideBar} />
  <div className="flex-1 flex flex-col">
    <NavBar handleSideBar={handleSideBar} />
    <div className={`p-5 mt-16 ${
    showSideBar ? 'ml-64' : 'ml-0'}`}
>
      <Outlet />
    </div>
  </div>
</div>
    </>
  );
};

export default MainLayout;
