import { Request, Response } from "express";
import {
  bcryptEncoded,
  comparePasswords,
  forgotPasswordSchema,
  generatePasswordResetToken,
 loginUsersSchema,
  registerUsersSchema,
  option,
  resetPasswordSchema,
  editUsersSchema,
  updateUsersPasswordSchema,
  verifyCode,
} from "../../utils/utils";
import { Users, UsersModel } from "./model";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  sendOTPVerificationEmail,
  sendResetOTP,
} from "../../lib/helper/sendVerificationEmail";
import { sendEmployeeEmail } from "../../lib/helper/sendEmployeeEmail";
import { EmployeePassword } from "../../lib/helper/generateEmployeePassword";
import generateVerifcationOTP from "../../lib/helper/generateVerficationOTP";
// import { generateusersId } from "../../lib/helper/generateusersId";
import { hashPassword } from "../../utils/utils";


// ============================ REGISTRATION SECTION ===================== //
// ============================ ==================== ===================== //
export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      Password,
      forgotPassword,
      dateOfBirth,
    } = req.body;

    const validateResult = registerUsersSchema.validate(req.body, option);

    if (validateResult.error) {
      return res
        .status(400)
        .json({ success: false, error: validateResult.error.details[0].message });
    }

    // Check if user exists
    const user = await UsersModel.findOne({
      where: { email: email },
    });
    if (user) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    const id = uuidv4();
    const random = Math.floor(Math.random() * 1000000);
    const usersId = `${firstName.slice(0, 2)}${random}`;

    const newUser = await UsersModel.create({
      ...validateResult.value,
      id,
      usersId,
    });

    if (!newUser) {
      return res.status(500).json({ success: false, error: "User registration failed" });
    }

    return res.status(200).json({
      success: true,
      message: "User registration successful",
      user: {
        id,
        usersId,
        email,
        firstName,
        lastName,
        phone,
        dateOfBirth,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

  


// ============================ LOGIN SECTION ===================== //
// ============================ ==================== ===================== //

// export const Login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);

//     const validateResult =   loginUsersSchema.validate(req.body, option);

//     if (validateResult.error) {
//       return res
//         .status(400)
//         .json({ error: validateResult.error.details[0].message });
//     }

//     const User = (await UsersModel.findOne({
//       where: { email: email },
//     })) as unknown as { [key: string]: string };

//     if (!User) {
//       return res.status(400).json({
//         error: "Invalid credentials",
//       });
//     }
//     console.log(User);
//     const { id } = User;

//     const validUser = await bcrypt.compare(password, User.password);

//     if (!validUser) {
//       return res.status(400).json({
//         error: "Invalid credentials",
//       });
//     }

//     const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET!, {
//       expiresIn: "1d",
//     });

//     res.cookie("token", "token", {
//       httpOnly: true,
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//     });
//     return res.status(200).json({
//       message: "SUCCESS",
//       User,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// // ============================ EMPLOYEE SECTION ===================== //
// // ============================ ==================== ===================== //

// export const OneEmployee = async (req: Request, res: Response) => {
//   try {
//     const OneEmployee = await UsersModel.findOne({
//       where: { id: req.params.id },
//     });
//     return res.status(200).json({ OneEmployee });
//   } catch (error) {
//     return res.status(500).json({ error, message: "error fetching employee" });
//   }
// };


// export const getEmployee = async (req: Request, res: Response) => {
//   try {
//     const employees = await UsersModel.findAll({
//     //   where: { role: ROLE.EMPLOYEE },
//     });

//     return res
//       .status(200)
//       .json({ employees, message: "All employees has been fetched" });
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     return res.status(500).json({ error, message: "error fetching employees" });
//   }
// };
// // ============================ TeamLead Member ===================== //
// // ============================ ==================== ===================== //

// export const getMembers = async (req: Request | any, res: Response) => {
//   try {
//     const isTeamLead = (await UsersModel.findByPk(req.user)) as unknown as User;

//     if (!isTeamLead.isTeamLead) {
//       return res.status(401).json({ error: "unauthorized" });
//     }
//     const members = await UsersModel.findAll({
//     //   where: { employee_Department: isTeamLead.employee_Department },
//     });
//     return res.status(200).json({ members });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// };

// export const updateEmployee = async (req: Request | any, res: Response) => {
//   try {
//     // Extract employee id from request body
//     const { id } = req.body;
//     console.log(id);

//     // Validate request body
//     const { error, value } = editUsersSchema.validate(req.body, option);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Find the employee by id
//     const employee = await UsersModel.findByPk(id);
//     console.log(employee);

//     if (!employee) {
//       throw new Error("Employee not found");
//     }

//     // Update the employee data
//     const user = await employee.update(req.body);

//     // Fetch the updated employee data
//     // const updatedEmployee = await UsersModel.findByPk(usersId);
//     return res
//       .status(201)
//       .json({ message: "Employee updated successfully", user });
//   } catch (error) {
//     console.error("Error updating employee:", error);
//     return res.status(500).json({ error: "Error updating employee" });
//   }
// };

// export const deleteEmployee = async (req: Request, res: Response) => {
//   try {
//     const DeleteusersId = req.params.id;
//     console.log(DeleteusersId);
//     const employee = await UsersModel.findOne({
//       where: { id: DeleteusersId },
//     });
//     console.log(employee);

//     if (!employee) {
//       throw new Error("Employee not found");
//     }

//     // Delete the employee
//     await employee.destroy();

//     return res.status(201).json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     throw new Error("Error deleting employee");
//   }
// };
// export const getEmployees = async () => {
//   try {
//     const employees = await UsersModel.findAll();
//     return employees;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     throw new Error("Error fetching employees");
//   }
// };

// // ============================ CHANGE PASSWORD SECTION ===================== //
// // ============================ ==================== ===================== //

// export const changePassword = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.body;
//     const { error, value } = updateUsersPasswordSchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const user = await UsersModel.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Log the retrieved user object to inspect it
//     console.log("Retrieved User Object:", user.toJSON());

//     // Access the password property on the user instance
//     const userPassword = user.get("password");

//     // Log passwords for debugging
//     console.log("Provided Password:", value.currentPassword);
//     console.log("Stored Hashed Password:", userPassword);

//     // Verify the current password with the known correct password
//     // Verify the current password
//     const isPasswordValid = await bcrypt.compare(
//       value.currentPassword.trim(),
//       userPassword as string
//     );

//     console.log("Is Password Valid:", isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Current password is incorrect" });
//     }

//     // Continue with the password update logic

//     const hashedPassword = await bcrypt.hash(value.newPassword, 10);
//     console.log("Hashed Password:", hashedPassword);

//     await user.update({ password: hashedPassword });

//     return res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// // ============================ VERIFY OTP SECTION ===================== //
// // ============================ ==================== ===================== //

// // export const verifyOTP = async (req: Request, res: Response) => {
// //   try {
// //     const { code, email } = req.body;
// //     const validateResult = verifyCode.validate(req.body, option);

// //     if (validateResult.error) {
// //       return res
// //         .status(400)
// //         .json({ error: validateResult.error.details[0].message });
// //     }

// //     const user = (await UsersModel.findOne({
// //       where: { email: email },
// //     })) as unknown as User;

// //     console.log(user, code, user.verificationOTP);

// //     if (!user) {
// //       return res.status(400).json({ error: "Invalid credentials" });
// //     }

// //     if (user.verificationOTP !== (code as string)) {
// //       return res.status(400).json({
// //         error: "Invalid token",
// //       });
// //     }

// //     if ((user.expiresAt as number) < new Date().getTime()) {
// //       return res.status(400).json({
// //         error: "Invalid token",
// //       });
// //     }

// //     user.verificationOTP = "";
// //     user.isVerified = true;

// //     await UsersModel.update(
// //       {
// //         expiresAt: user.expiresAt,
// //         verificationOTP: user.verificationOTP,
// //         isVerified: true,
// //       },
// //       { where: { id: user.id } }
// //     );

// //     return res.status(200).json({ message: "SUCCESS" });
// //   } catch (error) {
// //     res.status(500).json({ error });
// //   }
// // };

// // ============================ FORGOT PASSWORD SECTION ===================== //
// // ============================ ==================== ===================== //

// export const forgotPassword = async (req: Request, res: Response) => {
//   try {
//     const validationResult = forgotPasswordSchema.validate(req.body, option);
//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ error: validationResult.error.details[0].message });
//     }
//     const email = req.body;
  

//     const user = await UsersModel.findOne({ where: email });
//     console.log(user)

//     if (!user) return res.status(400).json({ error: "Invalid credentials" });
//     const OTP = generateVerifcationOTP();

//     const recipient = user.dataValues.email;
//     sendResetOTP(recipient, OTP);

//     const userReset = await UsersModel.update(
//       {
//         resetPasswordCode: OTP,
//         resetPasswordStatus: true,
//         resetPasswordExpiration: Date.now() + 600000,
//       },
//       { where: email }
//     );

//     return res.status(200).json({ message: "SUCCESS" });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // ============================ RESET PASSWORD SECTION ===================== //
// // ============================ ==================== ===================== //

// export const resetPassword = async (req: Request, res: Response) => {
//   try {
//     const { email, code, password, confirm_password } = req.body;
//     const validation = resetPasswordSchema.validate(req.body, option);
//     if (validation.error) {
//       return res
//         .status(400)
//         .json({ error: validation.error.details[0].message });
//     }
//     const user = (await UsersModel.findOne({
//       where: { email },
//     })) as unknown as User;
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });
//     if (user.resetPasswordCode !== code) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     if (
//       user.resetPasswordExpiration &&
//       (user.resetPasswordExpiration as number) < new Date().getTime()
//     ) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const hash = await bcryptEncoded({ value: password });

//     const userEmail = await UsersModel.update(
//       {
//         password: hash,
//         resetPasswordStatus: false,
//         resetPasswordCode: null,
//         resetPasswordExpiration: null,
//       },
//       { where: { id: user.id } }
//     );
//     if (!userEmail) {
//       let info: { [key: string]: string } = {
//         error: "Invalid credentials",
//       };
//       throw new Error(info.error);
//     }

//     return res.status(200).json({ message: "SUCCESS" });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

// export const resendVerificationOtp = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ error: "email is required" });
//     }
//     const user = await UsersModel.findOne({ where: { email } });

//     if (!user) {
//       return res.status(400).json({ error: "user does not exits" });
//     }
//     const OTP = generateVerifcationOTP();
//     sendOTPVerificationEmail(email, OTP);
//     const userUpdate = await UsersModel.update(
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
