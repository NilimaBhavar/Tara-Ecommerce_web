import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { googleLoginUser, registerUser } from "../services/authService";
import GoogleSignIn from "../components/GoogleSignIn";
import { useAuth } from "../context/authContextValue";
import {
    isStrongPassword,
    isValidEmail,
    isValidIndianPhone,
} from "../services/validation";

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
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
            navigate("/");
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

        if (!formData.name.trim() || !formData.email || !formData.phone || !formData.password) {

            setError("All fields are required");

            return;
        }

        if (!isValidEmail(formData.email)) {
            setError("Please enter a valid email address.");

            return;
        }

        if (!isValidIndianPhone(formData.phone)) {
            setError("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        if (!isStrongPassword(formData.password)) {
            setError("Password must be at least 8 characters and include uppercase and lowercase letters, a number, and a symbol.");
            return;
        }

        // Success

        setError("");

        try {

            const data =
                await registerUser(formData);

            login(data);
            alert("Registration Successful");
            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <main className="tara-page auth-container">

            {/* Left Side */}

            <div className="auth-left">

                <h1>Create Account 🚀</h1>

                <p>
                    Join Tara Store and enjoy
                    easy online shopping.
                </p>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="register"
                />

            </div>

            {/* Right Side */}

            <div className="auth-right">

                <form
                    className="modern-auth-form"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <h2>Register</h2>

                    {/* Error */}

                    {error && (
                        <p className="error-message" role="alert">
                            {error}
                        </p>
                    )}

                    {/* Name */}

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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

                    <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        autoComplete="tel"
                        required
                    />

                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />

                    {/* Button */}

                    <button type="submit">
                        Register
                    </button>

                    <div className="auth-divider" role="separator" aria-label="or">
                        <span>OR</span>
                    </div>

                    <GoogleSignIn
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google sign-in was not completed. Please try again.")}
                    />

                    <p>
                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </form>

            </div>

        </main>
    );
}

export default Register;