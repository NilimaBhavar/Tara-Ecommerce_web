const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB =
    require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const orderRoutes =
    require("./routes/orderRoutes");

const adminRoutes =
    require("./routes/adminRoutes");

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

// Routes

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

// Test Route

app.get("/", (req, res) => {

    res.send("API Running...");
});

// PORT

const PORT =
    process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});