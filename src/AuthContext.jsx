import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || null);
    const [userId, setUserId] = useState(localStorage.getItem("UserId") || null);
    const [isAuthentication, setIsAuthentication] = useState(localStorage.getItem("Authorizate") === "true");

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return Date.now() >= payload.exp * 1000;
        } catch (error) {
            return true;
        }
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) {
            return null;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}token`, { refreshToken });
            if (response.status === 200) {
                const { accessToken: newAccessToken } = response.data;
                setAccessToken(newAccessToken);
                localStorage.setItem("accessToken", newAccessToken);
                return newAccessToken;
            }
        } catch (error) {
            handleAuthentication(false);
            localStorage.clear();
            window.location.href = "/login";
            return null;
        }
    };

    const handleAuthentication = (status) => {
        setIsAuthentication(status);
        localStorage.setItem("Authorizate", status.toString());
    };

    const updateUserId = (id) => {
        setUserId(id);
        localStorage.setItem("UserId", id);
    };

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (isTokenExpired(accessToken)) {
                await refreshAccessToken();
            }
        };
        checkAndRefreshToken();
    }, [accessToken]);

    const value = {
        accessToken,
        setAccessToken,
        setRefreshToken,
        Authentication: handleAuthentication,
        userId,
        isAuthentication,
        Username: updateUserId,
        refreshAccessToken, // Exporting refreshAccessToken function
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
