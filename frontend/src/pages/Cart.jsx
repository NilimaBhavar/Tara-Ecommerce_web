import { useContext } from "react";
import { CartContext } from "../context/cartContextValue";
import { Link } from "react-router-dom";
import CatalogImage from "../components/CatalogImage";

function Cart() {
    const { cartItems, removeFromCart } =
        useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    return (
        <main className="tara-page cart-container">

            <h1 className="cart-title">
                🛒 Shopping Cart
            </h1>

            {cartItems.length === 0 ? (

                <div className="empty-cart">
                    <h2>🛍️ Cart Is Empty</h2>
                    <p>Add some products to continue shopping.</p>
                    <Link to="/products" className="tara-action-button">Browse products</Link>
                </div>

            ) : (

                <>
                    {cartItems.map((item) => (

                        <div
                            className="cart-item"
                            key={item.id}
                        >

                            <CatalogImage
                                src={item.image}
                                alt={item.name}
                                category={item.category}
                            />

                            <div className="cart-item-details">

                                <h3>{item.name}</h3>

                                <p className="cart-price">
                                    ₹ {item.price}
                                </p>

                                <p className="cart-quantity">
                                    Quantity: {item.quantity}
                                </p>

                            </div>

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>
                    ))}

                    <div className="cart-total-card">

                        <h2>
                            Total Amount
                        </h2>

                        <h1>
                            ₹ {totalPrice}
                        </h1>

                            <Link to="/checkout">

                                <button className="checkout-btn">
                                    Proceed To Checkout
                                </button>

                            </Link>

                    </div>
                </>
            )}

        </main>
    );
}

export default Cart;