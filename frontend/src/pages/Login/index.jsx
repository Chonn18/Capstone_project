import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login.png";
import { toaster } from "../../components/ui/toaster"
import Navbar from "../../components/Navbar/Navbar";
import API from "../../API";
// import { useUser } from "../../context/UserContext";
// import Footer from "../components/Footer/Footer";

const Login = () => {
    // const {setUser, login} = useUser()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Vui lòng nhập username và mật khẩu!");
            return; 
        }
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
      
        try {
            const response = await API.post("auth/login", formData);
            if (response.status === 200) {
                // console.log(response.data.access_token)
                login(response.data.access_token);
                setUser(response.data.user);
                toaster.create({
                    title : "Login success", 
                    type : "success"
                })
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/")
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            toaster.create({
                title : "Incorrect username or password", 
                type : "error"
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 mt-10">
                {/* Phần bên trái chứa ảnh và đoạn text */}
                <div className="w-1/2 bg-cover bg-center" style={{}}>
                    <div className="p-8 flex flex-col justify-center items-center h-full">
                        <h2 className="text-4xl font-bold mb-4 text-slate-900">
                            Welcome to CCHQ
                        </h2>
                        <p className="text-slate-700 text-lg">
                            If you want to know anything about cardiovascular
                            problems, let’s get started!
                        </p>
                    </div>
                    <img
                        src={Img}
                        alt=""
                        className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] p-5"
                    />
                </div>
                <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-sky-800 hover:bg-sky-800/70 text-white font-bold py-2 px-12 rounded"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-center p-5">
                        <a
                            href="/Main"
                            className="text-sky-600 hover:text-sky-600/60 font-light"
                        >
                            Fogot password ?{" "}
                        </a>
                    </div>

                    <hr className="border-t border-gray-300 w-full " />

                    <div className="flex items-center justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-600/80 text-white font-bold py-2 px-12 rounded"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
