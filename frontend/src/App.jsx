import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./layout/Landing";
import Denoise from "./pages/Denoise"
import Result from "./pages/Result";
import { useEffect } from "react";

function App() {
    
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/denoise" element={<Denoise />} />
                <Route path="/result" element={<Result />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
