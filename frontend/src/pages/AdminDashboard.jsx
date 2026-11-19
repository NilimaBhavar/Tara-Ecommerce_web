import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/authContextValue";
import { API_BASE_URL } from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
    const { user } = useAuth();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = useCallback(async () => {
        const response = await fetch(
                `${API_BASE_URL}/admin`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load dashboard");
        }

        return data;
    }, [user.token]);

    useEffect(() => {
        let active = true;

        fetchDashboard()
            .then((data) => {
                if (active) setDashboard(data);
            })
            .catch((error) => {
                if (active) setError(error.message);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [fetchDashboard]);

    const updateStatus = async (orderId, status) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/orders/${orderId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update status");
            }

            alert("Order status updated successfully");
            setDashboard(await fetchDashboard());
        } catch (error) {
            setError(error.message);
            alert(error.message);
        }
    };

    if (loading) {
        return <main className="tara-page page-message">Loading Admin Dashboard...</main>;
    }

    if (error) {
        return <main className="tara-page page-message error-message" role="alert">{error}</main>;
    }

    return (
        <main className="tara-page admin-dashboard">

            <h1>Admin Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Users</h3>
                    <p>{dashboard.totalUsers}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <p>{dashboard.totalOrders}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Sales</h3>
                    <p>₹{dashboard.totalSales}</p>
                </div>

            </div>

            <div className="recent-orders">

                <h2>Recent Orders</h2>

                {dashboard.recentOrders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    dashboard.recentOrders.map((order) => (

                        <div className="order-card" key={order._id}>

                            <p>
                                <strong>Order ID:</strong> {order._id}
                            </p>

                            <p>
                                <strong>Customer:</strong>{" "}
                                {order.shippingAddress.name}
                            </p>

                            <p>
                                <strong>Amount:</strong>{" "}
                                ₹{order.totalPrice}
                            </p>

                            <div className="status-section">

                                <strong>Status:</strong>

                                <select
                                    defaultValue={order.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Processing">
                                        Processing
                                    </option>

                                    <option value="Shipped">
                                        Shipped
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>

                        </div>
                    ))
                )}

            </div>

        </main>
    );
}

export default AdminDashboard;