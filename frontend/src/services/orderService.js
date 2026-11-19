import axios from "axios";
import { API_BASE_URL } from "./api";

const API_URL = `${API_BASE_URL}/orders`;

export const createOrder = async (orderData) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (!userInfo?.token) {
        throw new Error("Please log in to place an order");
    }

    const response = await axios.post(API_URL, orderData, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    });

    return response.data;
};

export const getMyOrders = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (!userInfo?.token) {
        throw new Error("Please log in to view your orders");
    }

    const response = await axios.get(`${API_URL}/my`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    });

    return response.data;
};
