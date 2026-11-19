const express =
    require("express");

const router =
    express.Router();

const {
    registerUser,
    loginUser,
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

module.exports = router;