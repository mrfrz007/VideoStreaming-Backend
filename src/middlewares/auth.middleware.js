import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

// Middleware function to verify JWT token and attach user object to request
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get the JWT token from the request header or cookie
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // If no token is present, throw an Unauthorized error
    if (!token) {
      throw new ApiError(401, " Unauthorized user");
    }
    // Verify the token using the ACCESS_TOKEN_SECRET environment variable
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // Find the user in the database using the user ID from the token
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    // If no user is found, throw an Invalid access token error
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    // Attach the user object to the request object for use in subsequent middleware and routes
    req.user = user;
    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If an error occurs, throw an Invalid access token error
    throw new ApiError(401, "Invalid access token");
  }
});
