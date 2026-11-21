const express =
    require("express");

const router =
    express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    updateProfile,
    googleLoginUser,
} = require(
    "../controllers/authcontroller"
);

// REGISTER

router.post(
    "/register",
    registerUser
);

// LOGIN

router.post(
    "/login",
    loginUser
);

router.post(
    "/google",
    googleLoginUser
);

router.put(
    "/profile",
    protect,
    updateProfile
);

module.exports = router;