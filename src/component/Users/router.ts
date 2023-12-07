import { Router } from "express";
import {
  // RegisterUser,
  // forgotPassword,
  // resetPassword,
  // Login,
  // OneEmployee,
  // getEmployee,
  // updateEmployee,
  // deleteEmployee,
  // changePassword,
  // getMembers,
} from "./Controller";

import { AuthMiddleware } from "../../lib/middleware/auth";


const router = Router();

// router.post("/register/user", RegisterUser);
// router.post("/login", Login);
// router.post("/forgotPassword", forgotPassword);
// router.post("/resetPassword", resetPassword);
// router.post("/login", Login);

// Get one employees
router.get(
  "/employees/:id",
  AuthMiddleware.Authenticate(["HR", "EMPLOYEE"]),
  // OneEmployee
);

// Get all employees
router.get(
  "/employees",
  AuthMiddleware.Authenticate(["HR", "EMPLOYEE"]),
  // getEmployee
);
router.get("/members", AuthMiddleware.Authenticate(["EMPLOYEE"]), 
// getMembers
);

// Update employee
router.put(
  "/employees/:id",
  AuthMiddleware.Authenticate(["HR", "EMPLOYEE"]),
  // updateEmployee
);

// Delete employee
router.delete(
  "/employees/:id",
  AuthMiddleware.Authenticate(["HR", "EMPLOYEE"]),
  // deleteEmployee
);

//settings and updates  
router.put("/updateProfile", 
// updateEmployee
);

// router.patch("/changePassword", changePassword);


export default router;
