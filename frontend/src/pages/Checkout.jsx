import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContextValue";
import { createOrder } from "../services/orderService";
import { isValidIndianPhone, isValidIndianPinCode } from "../services/validation";

function Checkout() {

    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (cartItems.length === 0 || submitting) return;

        if (!formData.name.trim() || !formData.address.trim() || !formData.city.trim()) {
            setError("Please complete your name, delivery address, and city.");
            return;
        }

        if (!isValidIndianPhone(formData.phone)) {
            setError("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        if (!isValidIndianPinCode(formData.pincode)) {
            setError("Please enter a valid 6-digit Indian PIN code, such as 411001.");
            return;
        }

        setError("");

        try {
            setSubmitting(true);

            const orderData = {

                items: cartItems.map((item) => ({

                    productId: item.id,

                    name: item.name,

                    price: item.price,

                    quantity: item.quantity,
                    image: item.image,

                })),

                shippingAddress: {

                    name: formData.name,

                    phone: formData.phone,

                    address: formData.address,

                    city: formData.city,

                    pincode: formData.pincode,

                },

                totalPrice: totalPrice,

            };

            const result = await createOrder(orderData);

            clearCart();
            navigate("/order-confirmation", { state: { order: result.order } });

        } catch (error) {

            console.error(
                "Order Error:",
                error
            );

            setError(error.response?.data?.message || error.message || "Failed to place order.");
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <main className="tara-page checkout-page">

            <div className="checkout-card">

                <h1>Checkout</h1>

                {cartItems.length === 0 && (
                    <p className="page-message">
                        Your cart is empty. <Link to="/products">Browse products</Link> to get started.
                    </p>
                )}

                <div className="order-summary">

                    <h2>Order Summary</h2>

                    {cartItems.map((item) => (

                        <div
                            key={item.id}
                            className="summary-item"
                        >

                            <span>
                                {item.name} x {item.quantity}
                            </span>

                            <span>
                                ₹ {item.price * item.quantity}
                            </span>

                        </div>

                    ))}

                    <h3>
                        Total: ₹ {totalPrice}
                    </h3>

                </div>

                <form onSubmit={handleSubmit} noValidate>

                    {error && <p className="error-message" role="alert">{error}</p>}

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        required
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        onChange={handleChange}
                    />

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        value={formData.address}
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="6-digit PIN code"
                        value={formData.pincode}
                        required
                        inputMode="numeric"
                        maxLength={6}
                        pattern="[1-9][0-9]{5}"
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={submitting || cartItems.length === 0}>
                        {submitting ? "Placing Order..." : "Place Order"}
                    </button>

                </form>

            </div>


        </main>
    );
}

export default Checkout;