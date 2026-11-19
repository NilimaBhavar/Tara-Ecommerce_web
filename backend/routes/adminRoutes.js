const express = require("express");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");

const {
    getAdminDashboard,
} = require("../controllers/admincontroller");

const router = express.Router();

router.get(
    "/",
    protect,
    admin,
    getAdminDashboard
);

module.exports = router;