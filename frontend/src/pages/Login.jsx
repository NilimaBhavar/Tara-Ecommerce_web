import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";

import { googleLoginUser, loginUser } from "../services/authService";
import GoogleSignIn from "../components/GoogleSignIn";

import { useAuth } from "../context/authContextValue";
import {
    isValidEmail,
} from "../services/validation";

function Login() {

    // Auth Context

    const { login } = useAuth();

    // Navigate

    const navigate = useNavigate();
    const location = useLocation();

    // Form State

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    const [error, setError] =
        useState("");

    const handleGoogleSuccess = async (credentialResponse) => {
        if (!credentialResponse.credential) {
            setError("Google sign-in did not return a credential. Please try again.");
            return;
        }

        try {
            const data = await googleLoginUser(credentialResponse.credential);
            login(data);
            const destination = location.state?.from?.pathname;
            navigate(data.isAdmin ? "/admin" : destination || "/");
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                "Google sign-in failed. Please try again."
            );
        }
    };

    // Handle Input

    const handleChange = (e) => {

        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    // Handle Submit

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validation

        if (!formData.email.trim() || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");

        try {

            // API Call

            const data = await loginUser({
                email: formData.email.trim(),
                password: formData.password,
            });

            // Save User Using Context

            login(data);

            alert("Login Successful");

            const destination = location.state?.from?.pathname;
            navigate(data.isAdmin ? "/admin" : destination || "/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (

        <main className="tara-page auth-container">

            {/* Left Side */}

            <div className="auth-left">

                <h1>
                    Welcome Back 👋
                </h1>

                <p>
                    Login to continue shopping
                    at Tara Store.
                </p>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                    alt="login"
                />

            </div>

            {/* Right Side */}

            <div className="auth-right">

                <form
                    className="modern-auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <h2>Login</h2>

                    {/* Error */}

                    {error && (
                        <p className="error-message" role="alert">
                            {error}
                        </p>

                    )}

                    {/* Email */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />

                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />

                    {/* Button */}

                    <button type="submit">
                        Login
                    </button>

                    <div className="auth-divider" role="separator" aria-label="or">
                        <span>OR</span>
                    </div>

                    <GoogleSignIn
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google sign-in was not completed. Please try again.")}
                    />

                    <p>
                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </form>

            </div>

        </main>
    );
}

export default Login;