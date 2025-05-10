import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login.png";
import Navbar from "../../components/Navbar/Navbar";
import { toaster } from "../../components/ui/toaster";
import API from "../../API";
// import Footer from "../components/Footer/Footer";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Điều hướng người dùng sau khi đăng ký thành công

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra dữ liệu
    if (password !== cfpassword) {
      toaster.create({
        title: "Password and confirm password do not match",
        type: "error",
      });
      return;
    }
    
    try {
      const response = await API.post("auth/signup", {
        username,
        email,
        password
      })
      if (response.status === 201) {
        toaster.create({
          title: "Sign up success",
          type: "success"
        })
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Điều hướng đến trang đăng nhập
        navigate("/login");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      console.log(error.response)
      toaster.create({
        title: error.response.data.detail,
        type: "error",
      })
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 mt-20">
        {/* Phần bên trái chứa ảnh và đoạn text */}
        <div className="w-1/2 bg-cover bg-center">
          <div className="p-4 flex flex-col justify-center items-center h-full">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Welcome to CCHQ</h2>
            <p className="text-slate-700 text-lg">If you want to know anything about cardiovascular problems, let’s get started!</p>
          </div>
          <img
            src={Img}
            alt=""
            className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
          />
        </div>

        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md mb-5">
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Create a new account</h2>
          <p className="text-slate-500 text-lg text-center mb-4">It's quick and easy.</p>
          <hr className="border-t border-gray-300 w-full p-1" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Ex: CuongPhiThuong"
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="cfpassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="cfpassword"
                value={cfpassword}
                onChange={(e) => setCfPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-600/80 text-white font-bold py-2 px-12 rounded"
              >
                Sign Up
              </button>
            </div>
          </form>
          <hr className="border-t border-gray-300 w-full my-4" />

          <div className="flex items-center justify-center ">
            <a href="/login" className="text-sky-600 hover:text-sky-300 font-light">Already have an account? </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
