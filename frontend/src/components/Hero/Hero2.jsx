import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import darkImg from "../../assets/medical03.avif";
import Img from "../../assets/medical02.jpg";
import AOS from "aos";

const Hero2 = ({ theme }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  });
  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? darkImg : Img}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Medical
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              We are CCHQ
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              If you want to know anything about cardiovascular problems, let chat{" "}
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={() => {
                navigate("/chat");
              }}
              className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-2 px-8 text-white font-semibold text-xl"
            >
              Let chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
