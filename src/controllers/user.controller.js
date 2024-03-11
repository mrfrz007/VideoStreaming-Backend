// Import required modules
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

// Register user function
const registerUser = asyncHandler( async (req, res) => {
   // Get user details from frontend
   const {fullName, email, username, password } = req.body

   // Validate that all fields are filled
   if (
       [fullName, email, username, password].some((field) => field?.trim() === "")
   ) {
       throw new ApiError(400, "All fields are required")
   }

   // Check if user already exists in the system with the same username or email
   const existedUser = await User.findOne({
       $or: [{ username }, { email }]
   })

   if (existedUser) {
       throw new ApiError(409, "User with email or username already exists")
   }

   // Check for avatar image
   const avatarLocalPath = req.files?.avatar[0]?.path;
   let coverImageLocalPath;

   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
       coverImageLocalPath = req.files.coverImage[0].path
   }

   // If avatar is not provided, throw an error
   if (!avatarLocalPath) {
       throw new ApiError(400, "Avatar file is required")
   }

   // Upload images to Cloudinary
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   // If avatar is not uploaded to Cloudinary, throw an error
   if (!avatar) {
       throw new ApiError(400, "Avatar file is required")
   }

   // Create a new user object
   const user = await User.create({
       fullName,
       avatar: avatar.url,
       coverImage: coverImage?.url || "",
       email, 
       password,
       username: username.toLowerCase()
   })

   // Find the newly created user in the database, excluding the password and refreshToken fields
   const createdUser = await User.findById(user._id).select(
       "-password -refreshToken"
   )

   // If the user is not found, throw an error
   if (!createdUser) {
       throw new ApiError(500, "Something went wrong while registering the user")
   }

   // Return the response to the frontend
   return res.status(201).json(
       new ApiResponse(200, createdUser, "User registered Successfully")
   )

} )

// Export the registerUser function
export default registerUser;