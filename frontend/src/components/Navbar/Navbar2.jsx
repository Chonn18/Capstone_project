import React, { useState } from "react";

import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaComments, FaUser } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "Information",
    link: "/#infor",
  },
  {
    id: 3,
    name: "Chat",
    link: "/chat",
  },
  {
    id: 4,
    name: "View KG",
    link: "/",
  },
];
const Navbar2 = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div
      className="fixed top-0 left-0 right-0 z-10 shadow-md w-full dark:bg-black dark:text-white duration-300
    "
    style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <a href={'/'} className="text-3xl font-bold font-serif">CCHQ</a>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-3">
                  <a
                    href={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </a>
                </li>
              ))}
              
            </ul>
          </nav>
          
          <div className="flex items-center gap-4 ">
            <FaUser></FaUser>
            <a href={'/'} className="text-slate-900 hover:text-slate-400">Logout</a>
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar2;
