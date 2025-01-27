import { createContext, useContext, useState, useEffect } from "react";
import { url } from "../../utils/api";

const userDashboardContext = createContext();

export const UserDashboardCtxProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const [isTokenValid, setIsTokenValid] = useState(false); // State to track token validity

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = localStorage.getItem('userToken');
    //         if (token) {
    //             try {
    //                 const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
    //                     method: "GET",
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });

    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     setUserToken(token);
    //                     setIsTokenValid(true);
    //                     console.log("Token is valid:", data);
    //                 } else {
    //                     console.warn("Token is invalid or expired. Removing it.");
    //                     localStorage.removeItem('userToken');
    //                     setUserToken(null);
    //                     setIsTokenValid(false);
    //                 }
    //             } catch (error) {
    //                 console.error("Error verifying token:", error);
    //                 localStorage.removeItem('userToken');
    //                 setUserToken(null);
    //                 setIsTokenValid(false);
    //             }
    //         }
    //     };

    //     checkToken();
    // }, []);

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
