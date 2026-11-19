const express = require("express");

const {
    createOrder,
    getMyOrders,
    updateOrderStatus,
} = require("../controllers/ordercontroller");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    createOrder
);

router.get(
    "/my",
    protect,
    getMyOrders
);

router.put(
    "/:id/status",
    protect,
    admin,
    updateOrderStatus
);

module.exports = router;