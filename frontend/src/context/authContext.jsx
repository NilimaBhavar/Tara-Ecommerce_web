import {
    useState,
} from "react";
import { AuthContext } from "./authContextValue";

const getStoredUser = () => {
    try {
        const userInfo = localStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    } catch {
        localStorage.removeItem("userInfo");
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser);

    const login = (data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};