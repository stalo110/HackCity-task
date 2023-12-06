"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../component/User/userController");
const router = express_1.default.Router();
router.post("/register", userController_1.RegisterHR);
router.post("/register/user", userController_1.RegisterUser);
// router.post("/register", Register);
router.post("/forgotPassword", userController_1.forgotPassword);
router.post("/resetPassword", userController_1.resetPassword);
exports.default = router;
