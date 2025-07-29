import React from 'react'
import { FaMapMarkerAlt, 
  FaPhoneAlt , FaEnvelope,
    FaFacebook, FaInstagram,
     FaLinkedin, FaAngleRight } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* School Info */}
        <div>
         <img src='/images/logo.jpeg' alt="logo" className="h-20 w-20 mb-2"/>
          <p className="lg:text-lg text-gray-300">
            Empowering minds through quality health education and leadership development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="lg:text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 lg:text-lg">
            <li className="flex items-center space-x-2">
                <FaAngleRight className="text-red-600" />
                <a href="#" className="hover:text-white">Home</a>
            </li>
            <li className="flex items-center space-x-2">
                <FaAngleRight className="text-red-600" />
                <a href="#" className="hover:text-white">About Us</a>
            </li>
            <li className="flex items-center space-x-2">
                <FaAngleRight className="text-red-600" />
                <a href="#" className="hover:text-white">Courses</a>
            </li>
            <li className="flex items-center space-x-2">
                <FaAngleRight className="text-red-600" />
                <a href="#" className="hover:text-white">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="lg:text-xl font-semibold mb-4">Contact Us</h3>
          <div className='flex space-x-2 mb-1'>
            <FaMapMarkerAlt className='text-red-600 mt-1 lg:text-xl'/>
             <p className="lg:text-lg text-gray-300 ">123 Health Road, Abuja, Nigeria</p>
          </div>
          <div className='flex space-x-2 mb-1'>
            <FaPhoneAlt className='text-red-600 mt-1 lg:text-xl'/>
              <p className="lg:text-lg text-gray-300">Phone: +234 801 234 5678</p>
          </div>
            <div className='flex space-x-2'>
                <FaEnvelope className='text-red-600 mt-1 lg:text-xl'/>
                <p className="lg:text-lg text-gray-300">Email: info@amanicollege.edu.ng</p>
            </div>
                {/* social media icons */}
            <div className='flex space-x-3 text-red-600 mt-5 text-2xl'>
                <FaFacebook/>
                <FaInstagram/>
                <FaLinkedin/>
            </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-8 border-t border-blue-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Amani College. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
