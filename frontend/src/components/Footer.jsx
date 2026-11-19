import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Store Info */}

                <div className="footer-section">

                    <h2>Tara Store</h2>

                    <p>
                        Your trusted local general store for daily needs.
                    </p>

                </div>

                {/* Quick Links */}

                <div className="footer-section">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>

                    <Link to="/products">Products</Link>

                    <Link to="/cart">Cart</Link>

                    <Link to="/login">Login</Link>

                </div>

                {/* Contact */}

                <div className="footer-section">

                    <h3>Contact</h3>

                    <p>Email: tarastore@gmail.com</p>

                    <p>Phone: +91 9876543210</p>

                </div>

            </div>

            <div className="footer-bottom">

                <p>© 2026 Tara Store. All Rights Reserved.</p>

            </div>

        </footer>
    );
}

export default Footer;