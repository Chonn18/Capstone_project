import React from "react";
import Img from "../../assets/medical01.webp";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 p-5"
    id="about">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={Img}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] p-5"
            />
          </div>
          <div>
            <div className="space-y-2 sm:p-6 pb-6">
              <h1
                data-aos="fade-up"
                className="text-4xl sm:text-5xl font-bold font-inter mb-6"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide font-nationpark font-medium text-xl">
              We are passionate about transforming medical imaging through the power of artificial intelligence. 
              Our platform is designed to enhance the clarity and resolution of CT scan images by removing noise and restoring fine details. 
              By improving image quality, we aim to support healthcare professionals in making more accurate diagnoses and improving patient outcomes. 
              With cutting-edge denoising and super-resolution technologies, we bring innovation to the frontlines of medical diagnostics.
              
              </p>
              <p data-aos="fade-up" className="leading-8 tracking-wide font-nationpark font-medium text-xl">
              Please note that this chatbot is intended for educational 
              purposes and should not replace professional medical advice.
              </p>
              {/* <button data-aos="fade-up" className="button-outline">
                Get Started
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
