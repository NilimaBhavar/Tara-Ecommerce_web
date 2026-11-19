import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import CartProvider from "./context/cartContext";

import { AuthProvider } from "./context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

const app = googleClientId ? (
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>
) : (
  <App />
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

      <CartProvider>
        {app}
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);