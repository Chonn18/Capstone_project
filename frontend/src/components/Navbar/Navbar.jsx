import React, { useState } from "react";
import botImage from '../../assets/bot.png'

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/landing",
  },
  {
    id: 2,
    name: "ABOUT",
    link: "/#about",
  },
  {
    id: 3,
    name: "Login",
    link: "/login",
  },
];
const Navbar = () => {
  
  return (
    <div
      className="fixed top-0 left-0 right-0 z-10 shadow-md w-full dark:bg-black dark:text-white duration-300
    "
    style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-between items-center px-8 mr-6">
            {/* <a href={'/'} className="text-3xl font-bold font-serif">CCHQ</a> */}
            <img src={botImage} className='w-10 '></img>
            <h1 className="font-bold text-sky-800 px-4">CTGenix</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-3 text-sky-900 hover:text-sky-500">
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
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
