import { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Component import
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Landing = () => {

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
 
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden p-4">
      <Navbar  />
      <Hero  />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
