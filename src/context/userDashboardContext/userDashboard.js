import { createContext, useContext, useState, useEffect } from "react";
import { url } from "../../utils/api";

const userDashboardContext = createContext();

export const UserDashboardCtxProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [isTokenValid, setIsTokenValid] = useState(false); // State to track token validity

    const setToken = (token,id) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('uuid', id);
        setUserToken(token);
        setUserUid(id)
        setIsTokenValid(true);
    };

    const removeToken = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('uuid');
        setUserToken(null);
        setUserUid(null)
        setIsTokenValid(false);
    };

    return (
        <userDashboardContext.Provider value={{ userToken, setToken, removeToken, setUserToken, isTokenValid,userUid, setUserUid }}>
            {children}
        </userDashboardContext.Provider>
    );
};

export const useUserDashboardContext = () => useContext(userDashboardContext);
