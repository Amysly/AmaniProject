import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Users,
  ShieldCheck,
  BookOpen,
  GraduationCap,
} from "lucide-react";

type SideBarProps = {
  showSideBar: boolean;
};

type NavLinkProps = { isActive: boolean };

const LinkClass = ({ isActive }: NavLinkProps) =>
  isActive
    ? "bg-blue-700 w-full block px-4 py-2 font-serif rounded"
    : "w-full block text-white font-serif px-4 py-2 rounded";

const SideBar: React.FC<SideBarProps> = ({ showSideBar }) => {
  const [openResults, setOpenResults] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const [openDepartments, setOpenDepartments] = useState(false);

  return (
    <div
      className={`
      fixed top-0 left-0 h-screen w-64 pt-16 bg-gray-900 p-5 text-white z-50
      transform transition-transform duration-300 ease-in-out
      ${showSideBar ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <h2 className="text-2xl font-bold mt-10">Admin Dashboard</h2>
      <nav className="mt-10">
        <ul>
          {/* Dashboard */}
          <li className="mt-5 mb-5">
            <NavLink
              to="/"
              className={({ isActive }: NavLinkProps) =>
                `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700 text-2xl`
              }
            >
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
          </li>

          {/* Department Dropdown */}
          <li className="mt-5 mb-5">
            <button
              onClick={() => setOpenDepartments(!openDepartments)}
              className="flex items-center justify-between w-full text-left text-white font-serif text-2xl p-2 hover:bg-gray-700 rounded"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={20} /> Departments
              </span>
              {openDepartments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openDepartments && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <NavLink
                    to="/departments"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                    Create Departments
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-departments"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                     All Departments
                  </NavLink>
                </li>
                                <li>
                  <NavLink
                    to="/courses"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                    Create Courses
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Results Dropdown */}
          <li className="mt-5 mb-5">
            <button
              onClick={() => setOpenResults(!openResults)}
              className="flex items-center justify-between w-full text-left text-white font-serif text-2xl p-2 hover:bg-gray-700 rounded"
            >
              <span className="flex items-center gap-2">
                <GraduationCap size={20} /> Results
              </span>
              {openResults ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openResults && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <NavLink
                    to="/resultentry"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                    Result Entry
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/viewresults"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                    View Results
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Users */}
          <li className="mt-5 mb-5">
            <NavLink
              to="/users"
              className={({ isActive }: NavLinkProps) =>
                `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700 text-2xl`
              }
            >
              <Users size={20} /> Users
            </NavLink>
          </li>

          {/* Roles Dropdown */}
          <li className="mt-5 mb-5">
            <button
              onClick={() => setOpenRoles(!openRoles)}
              className="flex items-center justify-between w-full text-left text-white font-serif text-2xl p-2 hover:bg-gray-700 rounded"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={20} /> Role
              </span>
              {openRoles ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openRoles && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <NavLink
                    to="/assign-roles"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                    Assign Roles
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/permission"
                    className={({ isActive }: NavLinkProps) =>
                      `${LinkClass({ isActive })} flex items-center gap-2 p-2 hover:bg-gray-700`
                    }
                  >
                    Permission
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
