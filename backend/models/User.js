const mongoose = require("mongoose");

const userSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
            },

            phone: {
                type: String,
                required: function () {
                    return !this.googleId;
                },
                match: /^[6-9]\d{9}$/,
            },

            password: {
                type: String,
                required: function () {
                    return !this.googleId;
                },
            },

            googleId: {
                type: String,
                unique: true,
                sparse: true,
            },

            avatar: {
                type: String,
                default: "",
            },

            isAdmin: {
                type: Boolean,
                default: false,
            },
        },

        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model("User", userSchema);