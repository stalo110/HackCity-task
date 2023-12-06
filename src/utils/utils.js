"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.assignTaskSchema = exports.updateTaskRequest = exports.CreateTaskSchema = exports.AssignMemberSchema = exports.UpdateProjectSchema = exports.ProjectSchema = exports.updatePayriseRequest = exports.createPayriseRequest = exports.updateleaveRequest = exports.createLeaveRequest = exports.updateEmployeePasswordSchema = exports.updateProfilePictureSchema = exports.resendResetPasswordOtpSchema = exports.resendVerificationOtpSchema = exports.loginUserSchema = exports.forgotPasswordSchema = exports.resetPasswordSchema = exports.verifyCode = exports.option = exports.updateEmployeeSchema = exports.registerEmployeeSchema = exports.registerUserSchema = exports.comparePasswords = exports.hashPassword = exports.generatePasswordResetToken = exports.bcryptDecode = exports.bcryptEncoded = exports.verify = exports.generateToken = void 0;
const bcryptjs_1 = __importStar(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.JWT_SECRET);
    return jsonwebtoken_1.default.sign(input, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
});
exports.generateToken = generateToken;
const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return verify;
    }
    catch (error) {
        return "token expired";
    }
});
exports.verify = verify;
const bcryptEncoded = (value) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.hash(value.value, yield (0, bcryptjs_1.genSalt)());
});
exports.bcryptEncoded = bcryptEncoded;
const bcryptDecode = (password, comparePassword) => {
    return bcryptjs_1.default.compare(password, comparePassword);
};
exports.bcryptDecode = bcryptDecode;
const generatePasswordResetToken = () => {
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};
exports.generatePasswordResetToken = generatePasswordResetToken;
const hashPassword = (password) => {
    return bcryptjs_1.default.hash(password, bcryptjs_1.default.genSaltSync());
};
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().email().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    password: joi_1.default.string()
        .trim()
        .regex(/^[a-zA-Z0-9]{3,18}$/)
        .required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
    phone: joi_1.default.string().required(),
});
exports.registerEmployeeSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().email().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    phone: joi_1.default.string(),
    role: joi_1.default.string(),
    workSchedule: joi_1.default.string().required(),
    endTime: joi_1.default.string().required(),
    startTime: joi_1.default.string().required(),
    DateOfBirth: joi_1.default.date(),
    preferredName: joi_1.default.string(),
    WorkLocation: joi_1.default.string(),
    salary: joi_1.default.string(),
    bankName: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().required(),
    accountName: joi_1.default.string().required(),
    JobTitle: joi_1.default.string(),
    nameOfEmergencyContact: joi_1.default.string(),
    relationshipWithEmergencyContact: joi_1.default.string(),
    phoneNumberOfEmergencyContact: joi_1.default.string(),
    isTeamLead: joi_1.default.boolean(),
    DateOfEmployment: joi_1.default.date(),
    employee_Department: joi_1.default.string().required(),
    employee_Status: joi_1.default.string(),
    emergency_contact: joi_1.default.string(),
    image: joi_1.default.string(),
});
exports.updateEmployeeSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().email(),
    id: joi_1.default.string().required(),
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    preferredName: joi_1.default.string(),
    DateOfBirth: joi_1.default.date(),
    address: joi_1.default.string(),
    City_State: joi_1.default.string(),
    Zip_code: joi_1.default.number(),
});
exports.option = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.verifyCode = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().email().required(),
    code: joi_1.default.string().required(),
});
exports.resetPasswordSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().email().required(),
    code: joi_1.default.number().required(),
    password: joi_1.default.string().required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});
exports.forgotPasswordSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
});
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .trim()
        .regex(/^[a-zA-Z0-9]{3,18}$/)
        .required(),
});
exports.resendVerificationOtpSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
});
exports.resendResetPasswordOtpSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
});
// export const updateEmployeeSchema = Joi.object().keys({
//   id: Joi.string().required(),
//   email: Joi.string().trim().lowercase().email().required(),
//   firstName: Joi.string().optional(),
//   lastName: Joi.string().optional(),
//   phone: Joi.string().optional(),
//   JobTitle: Joi.string().optional(),
//   isTeamLead: Joi.boolean().optional(),
//   EmploymentStatus: Joi.string().optional(),
//   employee_Department: Joi.string().optional(),
// });
exports.updateProfilePictureSchema = joi_1.default.object().keys({
    id: joi_1.default.string().required(),
    image: joi_1.default.any().meta({ swaggerType: 'file' }).required(),
});
// export const updateEmployeePasswordSchema = Joi.object().keys({
//   password: Joi.string().required(),
//   confirm_password: Joi.any()
//     .equal(Joi.ref("password"))
//     .required()
//     .label("Confirm password")
//     .messages({ "any.only": "{{#label}} does not match" }),
// });
exports.updateEmployeePasswordSchema = joi_1.default.object().keys({
    id: joi_1.default.string().required(),
    currentPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref("newPassword"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});
exports.createLeaveRequest = joi_1.default.object().keys({
    employeeId: joi_1.default.string().min(8).required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    department: joi_1.default.string().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    reason: joi_1.default.string().required(),
    supervisorName: joi_1.default.string().required(),
    employmentStatus: joi_1.default.string().required(),
    comment: joi_1.default.string(),
    totalLeaveDaysRequested: joi_1.default.number().integer().min(0).required(),
    attachment: joi_1.default.string().optional(),
});
exports.updateleaveRequest = joi_1.default.object().keys({
    status: joi_1.default.string().required(),
});
exports.createPayriseRequest = joi_1.default.object().keys({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    department: joi_1.default.string().required(),
    DateOfHire: joi_1.default.date().required(),
    reasons: joi_1.default.string().required(),
    EmployeeStatus: joi_1.default.string().required(),
    jobTitle: joi_1.default.string().required(),
    currentPay: joi_1.default.number().required(),
    proposedPay: joi_1.default.number().required(),
    attachments: joi_1.default.string().optional(),
    employeeId: joi_1.default.string().required(),
});
exports.updatePayriseRequest = joi_1.default.object().keys({
    status: joi_1.default.string().required(),
});
exports.ProjectSchema = joi_1.default.object().keys({
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    projectTitle: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    priority: joi_1.default.string().required(),
    Task: joi_1.default.array().items(joi_1.default.string()),
});
exports.UpdateProjectSchema = joi_1.default.object().keys({
    projectStatus: joi_1.default.string().required(),
});
exports.AssignMemberSchema = joi_1.default.object().keys({
    members: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.CreateTaskSchema = joi_1.default.array().items(joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    assignedTo: joi_1.default.string(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    projectId: joi_1.default.string().required(),
}));
exports.updateTaskRequest = joi_1.default.object().keys({
    status: joi_1.default.string().required(),
});
exports.assignTaskSchema = joi_1.default.object().keys({
    assignedTo: joi_1.default.string().required(),
});
