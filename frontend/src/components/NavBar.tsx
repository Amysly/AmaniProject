import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../feature/auth/authslice";

const NavBar: React.FC= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState<boolean>(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState<boolean>(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState<boolean>(false);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsOpen(false);
    setAboutDropdownOpen(false);
    setAcademicsDropdownOpen(false);
    setPortalDropdownOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
       if (
        isOpen &&
        !(e.target instanceof HTMLElement && e.target.closest(".mobile-menu-container"))
      ) {
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active link styling
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-serif text-lg lg:text-xl px-3 py-2 rounded-md transition-colors duration-200 flex items-center ${
      isActive
        ? "text-blue-900 font-bold"
        : "text-blue-700 hover:text-blue-900"
    }`;

  return (
    <nav
      className={`bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-1" : "py-2"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <NavLink
          to="/"
          className="text-blue-900 font-serif text-xl sm:text-2xl lg:text-3xl font-bold"
          onClick={closeMobileMenu}
        >
          <img src="/images/logo1.jpg" alt="logo" className="h-20 w-20" />
        </NavLink>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-blue-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <FaTimes size={24} className="text-blue-900" />
          ) : (
            <FaBars size={24} className="text-blue-900" />
          )}
        </button>

        {/* Desktop Navigation links */}
      <div className="hidden lg:flex lg:flex-row items-center lg:space-x-4 ml-auto">
          <NavLink to="/" className={getNavLinkClass} end>
           HOME
          </NavLink>

          {/* About Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
              className={`${getNavLinkClass({ isActive: false })} ${aboutDropdownOpen ? "font-bold" : ""}`}
            >
              ABOUT
              <FaChevronDown
                size={14}
                className='ml-1 transition-transform'
              />
            </button>
            <div
              className={`absolute w-48 bg-blue-600 shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
                aboutDropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <NavLink
                to="/about"
                className="block px-4 py-2 text-white border-b hover:bg-blue-700 transition-colors duration-200"
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/events"
                className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                EVENT
              </NavLink>
            </div>
          </div>

          {/* Academics Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setAcademicsDropdownOpen(true)}
              onMouseLeave={() => setAcademicsDropdownOpen(false)}
              className={`${getNavLinkClass({ isActive: false })} ${academicsDropdownOpen ? "font-bold" : ""}`}
            >
              ACADEMICS
              <FaChevronDown
                size={14}
                className='ml-1 transition-transform'
              />
            </button>
            <div
              className={`absolute w-48 bg-blue-600 shadow-lg z-50  overflow-hidden transition-all duration-300 ease-in-out ${
                academicsDropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              onMouseEnter={() => setAcademicsDropdownOpen(true)}
              onMouseLeave={() => setAcademicsDropdownOpen(false)}
            >
              <NavLink
                to="/courses"
                className="block px-4 py-2 text-white border-b hover:bg-blue-700 transition-colors duration-200"
              >
                COURSES
              </NavLink>
              <NavLink
                to="/academic-calendar"
                className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                ACADEMIC CALENDER
              </NavLink>
            </div>
          </div>

          <NavLink to="/contact" className={getNavLinkClass}>
            CONTACT
          </NavLink>
            {/* portal Dropdown */}
            <div className="relative">
            <button
              onMouseEnter={() =>  setPortalDropdownOpen(true)}
              onMouseLeave={() =>  setPortalDropdownOpen(false)}
              className={`${getNavLinkClass({ isActive: false })} ${portalDropdownOpen ? "font-bold" : ""}`}
            >
              PORTAL
              <FaChevronDown
                size={14}
                className='ml-1 transition-transform'
              />
            </button>
            <div
              className={`absolute w-48 bg-blue-600 shadow-lg z-50  overflow-hidden transition-all duration-300 ease-in-out ${
                  portalDropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              onMouseEnter={() =>  setPortalDropdownOpen(true)}
              onMouseLeave={() =>  setPortalDropdownOpen(false)}
            >
              <NavLink
                to="/login"
                className="block px-4 py-2 text-white border-b hover:bg-blue-700 transition-colors duration-200"
              >
                STUDENTS
              </NavLink>
              <NavLink
                to="/login"
                className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                STAFF
              </NavLink>
            </div>
          </div>
          {user ? (
            <button className='bg-blue-800' onClick={onLogout}>LOGOUT</button>
          ) : (
            <NavLink to="/login" className={getNavLinkClass}>
            LOGIN
          </NavLink>
          )}
           <NavLink to="/register" className='bg-blue-600 text-white p-2 text-lg rounded-sm'>
            Apply Here
          </NavLink>
          
        </div>

        {/* Mobile Navigation - Sidebar Style */}
        <div className="mobile-menu-container">
          {/* Overlay */}
          <div
            className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMobileMenu}
          />
          
          {/* Sidebar */}
          <div
            className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform
               transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto py-6 px-4">
              <div className="flex justify-end mb-6">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-blue-900"
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="border-b"></div>

              <NavLink
                to="/"
                className="block py-4 px-2 text-blue-900 text-lg font-serif border-b border-gray-200"
                onClick={closeMobileMenu}
              >
                HOME
              </NavLink>

              {/* About Dropdown Mobile */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className="flex justify-between items-center w-full py-4 px-2 text-blue-900 text-lg font-serif"
                >
                  ABOUT
                  <span>{aboutDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    aboutDropdownOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="/about"
                    className="block py-3 pl-6 text-blue-700 text-lg font-serif"
                    onClick={closeMobileMenu}
                  >
                    ABOUT US
                  </NavLink>
                  <NavLink
                    to="/events"
                    className="block py-3 pl-6 text-blue-700 text-lg font-serif"
                    onClick={closeMobileMenu}
                  >
                    EVENTS
                  </NavLink>
                </div>
              </div>

              {/* Academics Dropdown Mobile */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setAcademicsDropdownOpen(!academicsDropdownOpen)}
                  className="flex justify-between items-center w-full py-4 px-2 text-blue-900 text-lg font-serif"
                >
                  ACADEMICS
                  <span>{academicsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    academicsDropdownOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <NavLink
                    to="/courses"
                    className="block py-3 pl-6 text-blue-700 text-lg font-serif"
                    onClick={closeMobileMenu}
                  >
                    COURSES
                  </NavLink>
                  <NavLink
                    to="/academic-calendar"
                    className="block py-3 pl-6 text-blue-700 text-lg font-serif"
                    onClick={closeMobileMenu}
                  >
                    ACADEMIC CALENDER
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="/contact"
                className="block py-4 px-2 text-blue-900 text-xl border-b border-gray-200 font-serif"
                onClick={closeMobileMenu}
              >
                CONTACT
              </NavLink>
              <NavLink
                to="/register"
                className="block py-4 px-2 text-blue-900 text-xl border-b border-gray-200 font-serif"
                onClick={closeMobileMenu}
              >
                REGISTER
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;