import React from "react";
import Img from "../../assets/medical01.webp";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 p-10"
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
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              This chatbot is designed to assist you with questions about heart health, 
              cardiovascular diseases, and general cardiology.
              Whether you're curious about heart conditions, prevention tips, or treatments, 
              our chatbot is here to provide helpful information 
              and guide you in maintaining a healthy heart. 
              
              </p>
              <p data-aos="fade-up">
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
