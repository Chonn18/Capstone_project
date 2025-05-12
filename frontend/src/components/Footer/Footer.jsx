import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from '../../assets/logo_v2.png';

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  // {
  //   title: "Blog",
  //   link: "/#blog",
  // },
];
const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl w-full sm:place-items-center">
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-32">
        <div className=" grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className="  px-4 ">
            <div className="flex items-center gap-3">
              <img src={logo} className=" h-36 w-auto " alt="CTGenix Logo" />
            </div>

            <p className="text-lg font-thin -mt-5">
            Restoring clarity. Enhancing diagnosis.{" "}
            </p>
            <br />
            <div className="flex items-center gap-3 text-lg">
              <FaLocationArrow />
              <p>Da Nang city, Viet Nam</p>
            </div>
          </div>


          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-2xl text-2xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  {FooterLinks.map((link) => (
                    <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200 text-lg">
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-2xl text-2xl font-bold sm:text-left text-justify mb-3">
                  Contact
                </h1>
                <ul className={`flex flex-col gap-3`}>
                    
                    <div className="flex items-center gap-3 mt-3 text-lg">
                      <a  href="#">
                        <FaEnvelope />
                        
                      </a>
                      <p>duongvanchon18@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-lg">
                      <FaMobileAlt />
                      <p>+91 123456789</p>
                    </div>
                    {/* Social Handle */}
                  <div className="flex items-center gap-3 mt-6">
                    <a href="#">
                      <FaInstagram className="text-3xl hover:text-primary duration-300" />
                    </a>
                    <a href="#">
                      <FaFacebook className="text-3xl hover:text-primary duration-300" />
                    </a>
                    <a href="#">
                      <FaLinkedin className="text-3xl hover:text-primary duration-300" />
                    </a>
                  </div>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
