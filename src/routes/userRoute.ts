import express from "express";
import {
  // RegisterHR,
  RegisterUser,
  // forgotPassword,
  // resetPassword,
  // updateEmployee,
  // updateImage,
  // verifyOTP,
  //Register,
  // forgotPassword,
  // resetPassword,
  //verifyOTP,
} from "../component/Users/Controller";

const router = express.Router();


router.post("/register/user", RegisterUser);
// router.post("/register", Register);

// router.post("/forgotPassword", forgotPassword);
// router.post("/resetPassword", resetPassword);

export default router;
