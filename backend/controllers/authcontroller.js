const User =
    require("../models/User");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

const { OAuth2Client } =
    require("google-auth-library");

const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(password);

const isValidIndianPhone = (phone) => /^[6-9]\d{9}$/.test(phone);


// GENERATE JWT TOKEN

const generateToken = (id) => {

    return jwt.sign(
        { id },

        process.env.JWT_SECRET,

        {
            expiresIn: "30d",
        }
    );
};


// REGISTER USER

const registerUser = async (
    req,
    res
) => {

    try {

        const {
            name,
            email,
            phone,
            password,
        } = req.body || {};

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof email !== "string" ||
            !isValidEmail(email.trim()) ||
            typeof phone !== "string" ||
            !isValidIndianPhone(phone) ||
            typeof password !== "string" ||
            !isStrongPassword(password)
        ) {
            return res.status(400).json({
                message: "Enter a name, valid email, 10-digit Indian phone number, and a password of at least 8 characters with uppercase and lowercase letters, a number, and a symbol.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();

        // Check User Exists

        const userExists =
            await User.findOne({ email: normalizedEmail });

        if (userExists) {

            return res.status(400).json({
                message:
                    "User already exists",
            });
        }

        const phoneExists = await User.findOne({ phone: normalizedPhone });
        if (phoneExists) {
            return res.status(400).json({
                message: "An account with this phone number already exists",
            });
        }

        // Hash Password

        const salt =
            await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(
                password,
                salt
            );

        // Create User

        const user =
            await User.create({
                name,
                email: normalizedEmail,
                phone: normalizedPhone,
                password: hashedPassword,
            });

        // Response

        res.status(201).json({

            _id: user._id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            isAdmin: user.isAdmin,

            token: generateToken(
                user._id
            ),
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// LOGIN USER

const loginUser = async (
    req,
    res
) => {

    try {

        const {
            email,
            phone,
            password,
        } = req.body || {};

        if (
            typeof email !== "string" ||
            typeof phone !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Email, phone number, and password are required",
            });
        }

        if (
            !isValidEmail(email.trim()) ||
            !isValidIndianPhone(phone) ||
            !isStrongPassword(password)
        ) {
            return res.status(400).json({
                message: "Enter a valid email, 10-digit Indian phone number, and a password of at least 8 characters with uppercase and lowercase letters, a number, and a symbol.",
            });
        }

        // Find User

        const user =
            await User.findOne({ email: email.trim().toLowerCase() });

        // Check Password

        if (
            user &&
            user.password &&
            await bcrypt.compare(password, user.password) &&
            (!user.phone || user.phone === phone)
        ) {
            if (!user.phone) {
                const phoneInUse = await User.findOne({ phone });
                if (phoneInUse) {
                    return res.status(401).json({
                        message: "Invalid email, phone number, or password",
                    });
                }

                user.phone = phone;
                await user.save();
            }

            res.json({

                _id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                isAdmin: user.isAdmin,

                token: generateToken(
                    user._id
                ),
            });

        } else {

            res.status(401).json({
                message:
                    "Invalid email or password",
            });
        }

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

const googleLoginUser = async (req, res) => {
    const { credential } = req.body || {};
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (typeof credential !== "string" || !credential.trim()) {
        return res.status(400).json({
            message: "A Google credential is required",
        });
    }

    if (!clientId) {
        return res.status(503).json({
            message: "Google sign-in is not configured on the server",
        });
    }

    let payload;
    try {
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        });
        payload = ticket.getPayload();

        if (
            !payload?.sub ||
            typeof payload.email !== "string" ||
            payload.email_verified !== true ||
            !isValidEmail(payload.email)
        ) {
            return res.status(401).json({
                message: "Google did not provide a verified email address",
            });
        }
    } catch (error) {
        console.error("Google ID token verification failed:", error);
        return res.status(401).json({
            message: "Google sign-in could not be verified",
        });
    }

    try {
        const email = payload.email.trim().toLowerCase();
        let user = await User.findOne({ googleId: payload.sub });

        if (!user) {
            user = await User.findOne({ email });

            if (user?.googleId && user.googleId !== payload.sub) {
                return res.status(409).json({
                    message: "This email is already linked to a different Google account",
                });
            }

            if (user) {
                user.googleId = payload.sub;
                if (typeof payload.picture === "string") {
                    user.avatar = payload.picture;
                }
                await user.save();
            } else {
                user = await User.create({
                    name: payload.name || payload.given_name || email.split("@")[0],
                    email,
                    googleId: payload.sub,
                    avatar: typeof payload.picture === "string" ? payload.picture : "",
                });
            }
        } else if (typeof payload.picture === "string" && user.avatar !== payload.picture) {
            user.avatar = payload.picture;
            await user.save();
        }

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            avatar: user.avatar || "",
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this Google identity or email already exists",
            });
        }

        console.error("Google sign-in failed:", error);
        return res.status(500).json({
            message: "Google sign-in could not be completed",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleLoginUser,
};