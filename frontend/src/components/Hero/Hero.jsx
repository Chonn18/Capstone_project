import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import darkImg from "../../assets/medical03.avif";
import Img from "../../assets/CThero.png";
import AOS from "aos";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="dark:bg-black dark:text-white duration-300 p-8 sm:place-items-center mt-8">
      <div className="container w-full min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center py-2">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={Img}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ml-8">
            <p data-aos="fade-up" className="font-semibold text-4xl font-lilita ">
              Restoration
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-nationpark"
            >
              We are CTGenix
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000" className="text-primary text-3xl font-nationpark ">
              Improve the clarity and resolution of CT images using advanced denoising and super-resolution technologies.{" "}
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1000"
              onClick={() => {
                navigate("/denoise");
              }}
              className="  border-blue-950 border-2 rounded-md bg-gray-50 hover:bg-blue-950 transition duration-500 py-2 px-8 text-blue-950 hover:text-white font-semibold text-3xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
