import { Link } from "react-router-dom";

import { useContext } from "react";

import { CartContext } from "../context/cartContextValue";

import { useAuth } from "../context/authContextValue";

function Navbar() {

    // Cart Context

    const { cartItems } =
        useContext(CartContext);

    // Auth Context

    const {
        user,
        logout,
    } = useAuth();

    // Total Cart Quantity

    const totalItems =
        cartItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    return (

        <nav className="modern-navbar">

            {/* LOGO */}

            <Link
                to="/"
                className="logo"
            >

                🛍️ Tara Store

            </Link>

            {/* NAV LINKS */}

            <div className="nav-menu">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                {/* CART */}

                <Link
                    to="/cart"
                    className="cart-link"
                >

                    🛒 Cart

                    <span className="cart-badge">

                        {totalItems}

                    </span>

                </Link>

                {user && (
                    <Link to="/orders">
                        My Orders
                    </Link>
                )}

                {user && (
                    <Link to="/account">
                        My Account
                    </Link>
                )}

                {/* ADMIN DASHBOARD */}

                {user && user.isAdmin && (

                    <Link to="/admin">
                        Admin Dashboard
                    </Link>

                )}

                {/* USER */}

                {user ? (

                    <div className="user-section">

                        <span className="user-name">

                            👋 {user.name}

                        </span>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >

                            Logout

                        </button>

                    </div>

                ) : (

                    <>

                        <Link
                            to="/login"
                            className="nav-btn"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="register-btn"
                        >
                            Register
                        </Link>

                    </>

                )}

            </div>

        </nav>
    );
}

export default Navbar;