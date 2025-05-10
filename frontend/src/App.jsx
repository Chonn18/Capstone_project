import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Chat from "./pages/Chat";
import Import from "./pages/Import";
import About from "./pages/About";
import Visualization from "./pages/Visualization";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./layout/Landing";
import Home from "./pages/Home";
import { useEffect } from "react";

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing" index element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route index path="new-chat" element={<Chat />} />
                    <Route path="chat/:chatId" element={<Chat />} />
                    <Route path="import" element={<Import />} />
                    <Route path="visualization" element={<Visualization />} />
                    <Route path="about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
