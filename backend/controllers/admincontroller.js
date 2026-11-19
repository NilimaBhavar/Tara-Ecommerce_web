const User = require("../models/User");
const Order = require("../models/Order");

const getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();

        const totalSales = orders.reduce(
            (sum, order) => sum + order.totalPrice,
            0
        );

        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalUsers,
            totalOrders,
            totalSales,
            recentOrders,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to load admin dashboard",
            error: error.message,
        });
    }
};

module.exports = {
    getAdminDashboard,
};