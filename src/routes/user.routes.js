import { Router } from "express";
import { upload } from "../middlewares/middleware.multer.js";
import { registerUser, loginUser, logoutUser ,getAndSetRefreshToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
// safe routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(getAndSetRefreshToken)

export default router;
