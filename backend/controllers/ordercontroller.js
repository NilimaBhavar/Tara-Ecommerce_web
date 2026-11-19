const Order = require("../models/Order");

// CREATE ORDER

const createOrder = async (req, res) => {

    try {

        const {
            items,
            shippingAddress,
        } = req.body || {};

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "An order must contain at least one item",
            });
        }

        const validShippingAddress =
            shippingAddress &&
            ["name", "phone", "address", "city", "pincode"].every(
                (field) =>
                    typeof shippingAddress[field] === "string" &&
                    shippingAddress[field].trim()
            );

        if (!validShippingAddress) {
            return res.status(400).json({
                message: "Complete all shipping address fields",
            });
        }

        if (
            !/^[6-9]\d{9}$/.test(shippingAddress.phone.trim()) ||
            !/^[1-9]\d{5}$/.test(shippingAddress.pincode.trim())
        ) {
            return res.status(400).json({
                message: "Enter a valid 10-digit Indian phone number and 6-digit Indian PIN code",
            });
        }

        const validItems = items.every((item) =>
            item &&
            Number.isInteger(item.productId) &&
            typeof item.name === "string" &&
            item.name.trim() &&
            Number.isFinite(item.price) &&
            item.price >= 0 &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );

        if (!validItems) {
            return res.status(400).json({
                message: "Order items contain invalid product or quantity details",
            });
        }

        const totalPrice = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        if (!Number.isFinite(totalPrice)) {
            return res.status(400).json({
                message: "Order total is invalid",
            });
        }

        const order = await Order.create({

            user: req.user._id,

            items: items.map((item) => ({
                productId: item.productId,
                name: item.name.trim(),
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),

            shippingAddress: {
                name: shippingAddress.name.trim(),
                phone: shippingAddress.phone.trim(),
                address: shippingAddress.address.trim(),
                city: shippingAddress.city.trim(),
                pincode: shippingAddress.pincode.trim(),
            },

            totalPrice,

        });

        res.status(201).json({

            message: "Order placed successfully",

            order,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean();

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Failed to load your orders",
            error: error.message,
        });
    }
};


// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {

    try {

        const status = req.body?.status;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.status = status;

        await order.save();

        res.json({
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};


module.exports = {
    createOrder,
    getMyOrders,
    updateOrderStatus,
};