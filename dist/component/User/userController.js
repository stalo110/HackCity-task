"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendResetPasswordOtp = exports.resetPassword = exports.forgotPassword = exports.deleteProfileImageRoute = exports.getProfileImageRoute = exports.updateImage = exports.changePassword = exports.deleteEmployee = exports.updateEmployee = exports.getEmployee = exports.OneEmployee = exports.testingAll = exports.testingEMP = exports.testingHR = exports.Login = exports.RegisterUser = exports.RegisterHR = void 0;
const utils_1 = require("../../utils/utils");
const model_1 = require("./model");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendVerificationEmail_1 = require("../../lib/helper/sendVerificationEmail");
const sendEmployeeEmail_1 = require("../../lib/helper/sendEmployeeEmail");
const generateEmployeePassword_1 = require("../../lib/helper/generateEmployeePassword");
const generateVerficationOTP_1 = __importDefault(require("../../lib/helper/generateVerficationOTP"));
const utils_2 = require("../../utils/utils");
const cloudinary_1 = __importDefault(require("../../lib/helper/cloudinary"));
// ============================ REGISTRATION SECTION ===================== //
// ============================ ==================== ===================== //
const RegisterHR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, phone, password, confirm_password } = req.body;
        const validateResult = utils_1.registerUserSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ Error: validateResult.error.details[0].message });
        }
        const exist = yield model_1.UserModel.findOne({ where: { email } });
        if (exist) {
            return res.status(400).json({ error: "email already in use" });
        }
        const id = (0, uuid_1.v4)();
        const user = yield model_1.UserModel.create(Object.assign(Object.assign({}, validateResult.value), { id, role: model_1.ROLE.HR, password: yield (0, utils_2.hashPassword)(password) }));
        return res.status(201).json({ msg: "HR created successfully", user });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
});
exports.RegisterHR = RegisterHR;
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, phone, role, password, employee_Status, employee_Department, preferredName, WorkLocation, salary, bankName, accountName, accountNumber, emergency_contact, JobTitle, isTeamLead, } = req.body;
        const validateResult = utils_1.registerEmployeeSchema.validate(req.body, utils_1.option);
        // console.log(validateResult)
        if (validateResult.error) {
            return res
                .status(400)
                .json({ Error: validateResult.error.details[0].message });
        }
        const userPass = (0, generateEmployeePassword_1.EmployeePassword)();
        //Generate salt for password hash
        const salt = yield bcryptjs_1.default.genSalt(10);
        //Generate password hash (salt + hash)
        const passwordHash = yield bcryptjs_1.default.hash(userPass, salt);
        //Check if user exist
        const user = yield model_1.UserModel.findOne({
            where: { email: email },
        });
        if (user) {
            return res.status(400).json({ error: "Email already exist" });
        }
        const id = (0, uuid_1.v4)();
        const random = Math.floor(Math.random() * 1000000);
        const alphabet = req.body.employee_Department.slice(0, 2);
        const employeeId = alphabet + random;
        const newUser = yield model_1.UserModel.create(Object.assign(Object.assign({}, validateResult.value), { id,
            employeeId, role: model_1.ROLE.EMPLOYEE, password: yield (0, utils_2.hashPassword)(userPass) }));
        if (!newUser) {
            return res.status(400).json({ error: "Email already exist" });
        }
        (0, sendEmployeeEmail_1.sendEmployeeEmail)(email, userPass, employeeId);
        return res
            .status(201)
            .json({
            msg: "Your Employee Login has been sent to your email",
            newUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
});
exports.RegisterUser = RegisterUser;
// ============================ LOGIN SECTION ===================== //
// ============================ ==================== ===================== //
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const validateResult = utils_1.loginUserSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message });
        }
        const User = (yield model_1.UserModel.findOne({
            where: { email: email },
        }));
        if (!User) {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }
        console.log(User);
        const { id } = User;
        const validUser = yield bcryptjs_1.default.compare(password, User.password);
        if (!validUser) {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: User.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", "token", {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "SUCCESS",
            User,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.Login = Login;
const testingHR = (req, res) => {
    try {
        return res.status(200).json({ message: "HR route" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.testingHR = testingHR;
const testingEMP = (req, res) => {
    try {
        return res.status(200).json({ message: "employee" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.testingEMP = testingEMP;
const testingAll = (req, res) => {
    try {
        return res.status(200).json({ message: "all route" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.testingAll = testingAll;
// ============================ EMPLOYEE SECTION ===================== //
// ============================ ==================== ===================== //
const OneEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OneEmployee = yield model_1.UserModel.findOne({
            where: { id: req.params.id },
        });
        return res.status(200).json({ OneEmployee });
    }
    catch (error) {
        return res.status(500).json({ error, message: "error fetching employee" });
    }
});
exports.OneEmployee = OneEmployee;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getEmployee = yield model_1.UserModel.findAll({
            where: { role: model_1.ROLE.EMPLOYEE },
        });
        return res.status(200).json({ getEmployee });
    }
    catch (error) {
        return res.status(500).json({ error, message: "error fetching employee" });
    }
});
exports.getEmployee = getEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { error, value } = utils_1.updateEmployeePasswordSchema.validate(req.body, utils_1.option);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const employee = yield model_1.UserModel.findByPk(id);
        if (!employee) {
            throw new Error("Employee not found");
        }
        // Update the employee data
        yield employee.update(value);
        // No need to fetch the updated employee separately
        return res.status(200).json(employee);
    }
    catch (error) {
        console.error("Error updating employee:", error);
        throw new Error("Error updating employee");
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield model_1.UserModel.findByPk(employeeId);
        if (!employee) {
            throw new Error("Employee not found");
        }
        // Delete the employee
        yield employee.destroy();
        return { message: "Employee deleted successfully" };
    }
    catch (error) {
        console.error("Error deleting employee:", error);
        throw new Error("Error deleting employee");
    }
});
exports.deleteEmployee = deleteEmployee;
// const getEmployees = async () => {
//   try {
//     const employees = await Employee.findAll();
//     return employees;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     throw new Error("Error fetching employees");
//   }
// };
// ============================ CHANGE PASSWORD SECTION ===================== //
// ============================ ==================== ===================== //
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { error, value } = utils_1.updateEmployeePasswordSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = yield model_1.UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Log the retrieved user object to inspect it
        console.log("Retrieved User Object:", user.toJSON());
        // Access the password property on the user instance
        const userPassword = user.get("password");
        // Log passwords for debugging
        console.log("Provided Password:", value.currentPassword);
        console.log("Stored Hashed Password:", userPassword);
        // Verify the current password with the known correct password
        // Verify the current password
        const isPasswordValid = yield bcryptjs_1.default.compare(value.currentPassword.trim(), userPassword);
        console.log("Is Password Valid:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }
        // Continue with the password update logic
        const hashedPassword = yield bcryptjs_1.default.hash(value.newPassword, 10);
        console.log("Hashed Password:", hashedPassword);
        yield user.update({ password: hashedPassword });
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.changePassword = changePassword;
// ============================ IMAGE UPLOAD/UPDATE SECTION ===================== //
// ============================ ==================== ===================== //
// Upload/Update Profile Image Route
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Upload image to Cloudinary
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        // Get the Cloudinary URL
        const imageUrl = result.secure_url;
        // Assuming you have a user ID in the request parameters
        const { id } = req.params;
        // Update the user's profile image URL in the database
        const user = yield model_1.UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update the user's profile with the new image URL
        yield user.update({ image: imageUrl });
        res.status(200).json({ imageUrl });
    }
    catch (error) {
        console.error("Update profile image error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateImage = updateImage;
const getProfileImageRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        // Find the user by ID
        const user = yield model_1.UserModel.findByPk(userId);
        if (!user) {
            console.log('User not found for ID:', userId);
            return res.status(404).json({ error: 'User not found' });
        }
        // Log the user object to inspect
        console.log('User Object:', user.toJSON());
        // Get the profile image URL from the user data
        const profileImageUrl = user.get('image'); // Adjust property name based on your model
        if (!profileImageUrl) {
            console.log('Profile image not found for user ID:', userId);
            return res.status(404).json({ error: 'Profile image not found for the user' });
        }
        // Respond with the profile image URL
        res.status(200).json({ profileImageUrl });
    }
    catch (error) {
        console.error('Error fetching profile image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getProfileImageRoute = getProfileImageRoute;
const deleteProfileImageRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.params.id;
        // Find the user by ID
        const user = yield model_1.UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Get the profile image URL from the user data
        const profileImageUrl = user.image;
        if (!profileImageUrl) {
            return res.status(404).json({ error: 'Profile image not found for the user' });
        }
        // Delete the image from Cloudinary
        const publicId = (_a = profileImageUrl.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
        yield cloudinary_1.default.uploader.destroy(publicId);
        // Update the user model to remove the image property
        const defaultImageUrl = 'default_image_url'; // Replace with an appropriate default value
        yield user.update({ image: defaultImageUrl });
        res.status(200).json({ message: 'Profile image deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting profile image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteProfileImageRoute = deleteProfileImageRoute;
// ============================ VERIFY OTP SECTION ===================== //
// ============================ ==================== ===================== //
// export const verifyOTP = async (req: Request, res: Response) => {
//   try {
//     const { code, email } = req.body;
//     const validateResult = verifyCode.validate(req.body, option);
//     if (validateResult.error) {
//       return res
//         .status(400)
//         .json({ error: validateResult.error.details[0].message });
//     }
//     const user = (await UserModel.findOne({
//       where: { email: email },
//     })) as unknown as User;
//     console.log(user, code, user.verificationOTP);
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     if (user.verificationOTP !== (code as string)) {
//       return res.status(400).json({
//         error: "Invalid token",
//       });
//     }
//     if ((user.expiresAt as number) < new Date().getTime()) {
//       return res.status(400).json({
//         error: "Invalid token",
//       });
//     }
//     user.verificationOTP = "";
//     user.isVerified = true;
//     await UserModel.update(
//       {
//         expiresAt: user.expiresAt,
//         verificationOTP: user.verificationOTP,
//         isVerified: true,
//       },
//       { where: { id: user.id } }
//     );
//     return res.status(200).json({ message: "SUCCESS" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
// ============================ FORGOT PASSWORD SECTION ===================== //
// ============================ ==================== ===================== //
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = utils_1.forgotPasswordSchema.validate(req.body, utils_1.option);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ error: validationResult.error.details[0].message });
        }
        const email = req.body;
        const user = yield model_1.UserModel.findOne({ where: email });
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });
        const OTP = (0, generateVerficationOTP_1.default)();
        const recipient = user.dataValues.email;
        (0, sendVerificationEmail_1.sendResetOTP)(recipient, OTP);
        const userReset = yield model_1.UserModel.update({
            resetPasswordCode: OTP,
            resetPasswordStatus: true,
            resetPasswordExpiration: Date.now() + 600000,
        }, { where: email });
        return res.status(200).json({ message: "SUCCESS" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.forgotPassword = forgotPassword;
// ============================ RESET PASSWORD SECTION ===================== //
// ============================ ==================== ===================== //
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code, password, confirm_password } = req.body;
        const validation = utils_1.resetPasswordSchema.validate(req.body, utils_1.option);
        if (validation.error) {
            return res
                .status(400)
                .json({ error: validation.error.details[0].message });
        }
        const user = (yield model_1.UserModel.findOne({
            where: { email },
        }));
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });
        if (user.resetPasswordCode !== code) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        if (user.resetPasswordExpiration &&
            user.resetPasswordExpiration < new Date().getTime()) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const hash = yield (0, utils_1.bcryptEncoded)({ value: password });
        const userEmail = yield model_1.UserModel.update({
            password: hash,
            resetPasswordStatus: false,
            resetPasswordCode: null,
            resetPasswordExpiration: null,
        }, { where: { id: user.id } });
        if (!userEmail) {
            let info = {
                error: "Invalid credentials",
            };
            throw new Error(info.error);
        }
        return res.status(200).json({ message: "SUCCESS" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.resetPassword = resetPassword;
// ============================ RESEND VERIFICATION OTP SECTION ===================== //
// ============================ ==================== ===================== //
// export const resendVerificationOtp = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     const validation = resendVerificationOtpSchema.validate(req.body, option);
//     if (validation.error) {
//       return res
//         .status(400)
//         .json({ error: validation.error.details[0].message });
//     }
//     const user = await UserModel.findOne({
//       where: { email: email },
//     });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const OTP = generateVerifcationOTP();
//     sendOTPVerificationEmail(email, OTP);
//     await UserModel.update(
//       {
//         verificationOTP: OTP,
//         expiresAt: Date.now() + 5 * 60 * 1000,
//       },
//       { where: { email: email } }
//     );
//     return res.status(200).json({ message: "SUCCESS" });
//   } catch (error) {
//     return res.status(500).json({
//       error,
//     });
//   }
// };
// ============================ RESEND RESET PASSWORD OTP SECTION ===================== //
// ============================ ==================== ===================== //
const resendResetPasswordOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const validation = utils_1.resendResetPasswordOtpSchema.validate(req.body, utils_1.option);
        if (validation.error) {
            return res
                .status(400)
                .json({ error: validation.error.details[0].message });
        }
        const user = (yield model_1.UserModel.findOne({
            where: { email: email },
        }));
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }
        const OTP = (0, generateVerficationOTP_1.default)();
        (0, sendVerificationEmail_1.sendResetOTP)(email, OTP);
        yield model_1.UserModel.update({
            resetPasswordCode: OTP,
            resetPasswordStatus: true,
            resetPasswordExpiration: Date.now() + 5 * 60 * 1000,
        }, { where: { email: email } });
        return res.status(200).json({ message: "SUCCESS" });
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
    }
});
exports.resendResetPasswordOtp = resendResetPasswordOtp;
// export const resendVerificationOtp = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ error: "email is required" });
//     }
//     const user = await UserModel.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ error: "user does not exits" });
//     }
//     const OTP = generateVerifcationOTP();
//     sendOTPVerificationEmail(email, OTP);
//     const userUpdate = await UserModel.update(
//       {
//         verificationOTP: OTP,
//         expiresAt: Date.now() + 5 * 60 * 1000,
//         isVerified: false,
//       },
//       { where: { email } }
//     );
//     return res
//       .status(200)
//       .json({ message: "new OTP has been sent to your mail" });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };
