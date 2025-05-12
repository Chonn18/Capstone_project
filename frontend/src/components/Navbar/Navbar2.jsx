import React from "react";
import { Link } from "react-router-dom"; // Dùng nếu bạn dùng React Router
import logo from '../../assets/logo_notext.png';
import logoText from '../../assets/logo_text.png';

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/",
  },
  {
    id: 2,
    name: "ABOUT",
    link: "/result",
  },
];

const Navbar2 = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-10 shadow-md w-full bg-white dark:bg-black dark:text-white duration-300 py-2"
    >
      <div className="w-full mx-auto px-12 h-fit flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 py-1">
          <img src={logo} className=" h-16 w-auto " alt="CTGenix Logo" />
          <img src={logoText} className=" h-9 w-auto mt-8 -ml-4" alt="CTGenix Text" />
          {/* <h1 className="font-bold text-sky-800 text-4xl">CTGenix</h1> */}
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id} className=" ">
                <Link
                  to={link}
                  className=" text-headercolor text-3xl font-bold hover:text-texthover py-2 px-2 hover:border-b-2 hover:texthover transition-all duration-300"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>

  );
};

export default Navbar2;
