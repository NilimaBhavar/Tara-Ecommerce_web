import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
    const { state } = useLocation();
    const order = state?.order;

    if (!order) {
        return (
            <main className="tara-page order-confirmation-page">
                <section className="order-confirmation-card">
                    <p className="page-eyebrow">ORDER DETAILS</p>
                    <h1>Confirmation unavailable</h1>
                    <p>This confirmation is no longer available in this tab. You can still view your order history.</p>
                    <Link to="/orders" className="tara-action-button">View my orders</Link>
                </section>
            </main>
        );
    }

    const address = order.shippingAddress || {};
    const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();

    return (
        <main className="tara-page order-confirmation-page">
            <section className="order-confirmation-card">
                <div className="order-confirmation-icon" aria-hidden="true">✓</div>
                <p className="page-eyebrow">TARA STORE ORDER</p>
                <h1>Thank you for your order!</h1>
                <p className="confirmation-intro">Your order is placed. We’ll take care of the rest.</p>

                <div className="confirmation-meta">
                    <div>
                        <span>Order number</span>
                        <strong>{order._id || "Confirmed"}</strong>
                    </div>
                    <div>
                        <span>Placed on</span>
                        <strong>{orderDate.toLocaleString()}</strong>
                    </div>
                    <div>
                        <span>Status</span>
                        <strong className="order-status">{order.status || "Pending"}</strong>
                    </div>
                </div>

                <div className="confirmation-section">
                    <h2>Items</h2>
                    {(order.items || []).map((item, index) => (
                        <div className="confirmation-line" key={`${item.productId}-${index}`}>
                            <span>{item.name} × {item.quantity}</span>
                            <strong>₹{item.price * item.quantity}</strong>
                        </div>
                    ))}
                    <div className="confirmation-total">
                        <span>Order total</span>
                        <strong>₹{order.totalPrice}</strong>
                    </div>
                </div>

                <div className="confirmation-section confirmation-address">
                    <h2>Delivery address</h2>
                    <p>{address.name}</p>
                    <p>{address.address}, {address.city} {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                </div>

                <div className="confirmation-actions">
                    <Link to="/orders" className="tara-action-button">View my orders</Link>
                    <Link to="/products" className="confirmation-secondary-link">Continue shopping</Link>
                </div>
            </section>
        </main>
    );
}

export default OrderConfirmation;
