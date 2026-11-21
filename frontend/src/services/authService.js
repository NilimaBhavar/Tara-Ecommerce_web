import axios from "axios";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/auth`;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const googleLoginUser = async (credential) => {
    const response = await axios.post(`${API_URL}/google`, { credential });
    return response.data;
};

export const updateUserProfile = async (updates) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (!userInfo?.token) {
        throw new Error("Please log in to update your profile");
    }

    const response = await axios.put(`${API_URL}/profile`, updates, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    });
    return response.data;
};
