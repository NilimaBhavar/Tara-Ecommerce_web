import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        getMyOrders()
            .then((data) => {
                if (active) setOrders(data);
            })
            .catch((requestError) => {
                if (active) {
                    setError(
                        requestError.response?.data?.message ||
                        requestError.message ||
                        "Could not load your orders."
                    );
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <main className="tara-page orders-page">
            <header className="page-heading">
                <p className="page-eyebrow">YOUR TARA STORE ACTIVITY</p>
                <h1>My Orders</h1>
                <p>Track the status and details of your recent purchases.</p>
            </header>

            {loading && <p className="page-message">Loading your orders…</p>}
            {error && <p className="error-message" role="alert">{error}</p>}

            {!loading && !error && orders.length === 0 && (
                <section className="orders-empty">
                    <h2>No orders yet</h2>
                    <p>Your purchases will appear here after you place an order.</p>
                    <Link to="/products" className="tara-action-button">Explore products</Link>
                </section>
            )}

            <div className="orders-list">
                {orders.map((order) => (
                    <article className="order-history-card" key={order._id}>
                        <div className="order-history-heading">
                            <div>
                                <span className="page-eyebrow">ORDER PLACED</span>
                                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`order-status status-${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="order-history-items">
                            {order.items.map((item, index) => (
                                <div className="order-history-item" key={`${item.productId}-${index}`}>
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="order-history-footer">
                            <span>Ship to {order.shippingAddress.city}, {order.shippingAddress.pincode}</span>
                            <strong>Total ₹{order.totalPrice}</strong>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Orders;
