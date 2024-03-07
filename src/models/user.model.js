// Import necessary modules
import mongoose, { Schema, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "config";

// Define user schema
const userSchema = new Schema(
  {
    // Unique username for each user
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Unique email for each user
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Full name of the user
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // Avatar URL for the user
    avatar: {
      type: String, //cloudenary url
      required: true,
      lowercase: true,
      trim: true,
    },
    // Cover image URL for the user
    coverImage: {
      type: String, //cloudenary url
      lowercase: true,
      trim: true,
    },
    // Array of video IDs that the user has watched
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    // User's password
    password: {
      type: String,
      required: [true, "password is required"],
      unique: true,
      trim: true,
    },
    // User's refresh token for generating new access tokens
    refreshToken: {
      type: String,
    },
  },
  { timeStamps: true }
);

// Pre-save hook to hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hash(this.password, 10);
  next();
});

// Method to check if the provided password matches the user's password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate a new access token for the user
userSchema.methods.generateAccessToken = function () {
  // Sign the token with the user's ID, email, username, and full name
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    config.ACCESS_TOKEN_SECRET, {
    // Set the token to expire after 1 day
    expiresIn: config.ACCESS_TOKEN_EXPIRY
    }
  );
};

// Method to generate a new refresh token for the user
userSchema.methods.generateRefreshToken = function () {
  // Sign the token with the user's ID
  jwt.sign(
    {
      _id: this._id,
    },
    config.REFRESH_TOKEN_SECRET, {
    // Set the token to expire after 10 days
    expiresIn: config.REFRESH_TOKEN_EXPIRY
    }
  );
};

// Export the User model
export const User = mongoose.model("User", userSchema);