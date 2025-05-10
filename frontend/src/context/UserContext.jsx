import { prepareRowComponentToken } from "antd/es/grid/style";
import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../API";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // const [user, setUser] = useState({
    //     token : sessionStorage.getItem("token"),
    //     userData : null
    // });
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState({});

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await API.get("auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    console.log(response.data);
                }
            } catch (error) {
                console.error(error);
                logout();
                console.log("Token is invalid");
            }
        };
        verifyToken();
    }, [token]);

    const login = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ token, user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
