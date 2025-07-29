import React from 'react'
import{Outlet} from 'react-router-dom'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ScrollUpButton from "../components/ScrollUpButton";
const MainLayout = () => {
  return (
    <div>
    <NavBar/>
    <Outlet/>
    <Footer/>
    <ScrollUpButton/>
      
    </div>
  )
}

export default MainLayout
