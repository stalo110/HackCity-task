import { Request, Response } from "express";
import {

 loginUsersSchema,
  registerUsersSchema,
  option,
} from "../../utils/utils";
import { Users, UsersModel } from "./model";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// ============================ REGISTRATION SECTION ===================== //
// ============================ ==================== ===================== //
export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      password, // Change from Password to password for consistency
      forgotPassword,
      dateOfBirth,
    } = req.body;

    const validateResult = registerUsersSchema.validate(req.body, option);

    if (validateResult.error) {
      return res.status(400).json({ success: false, error: validateResult.error.details[0].message });
    }

    // Check if user exists
    const userExists = await UsersModel.findOne({
      where: { email: email },
    });

    if (userExists) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    const id = uuidv4();
    const random = Math.floor(Math.random() * 1000000);
    const usersId = `${firstName.slice(0, 2)}${random}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UsersModel.create({
      ...validateResult.value,
      id,
      usersId,
      password: hashedPassword, // Store the hashed password
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
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


  


// ============================ LOGIN SECTION ===================== //
// ============================ ==================== ===================== //

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password: userPassword } = req.body;

    const validateResult = loginUsersSchema.validate(req.body, option);

    if (validateResult.error) {
      return res.status(400).json({ success: false, error: validateResult.error.details[0].message });
    }

    const user = (await UsersModel.findOne({
      where: { email: email },
    })) as unknown as Users;
    
    console.log(user);
    
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }
    
    const { id, password: hashedPassword } = user;
    
    const validUser = await bcrypt.compare(userPassword, hashedPassword);
    
    if (!validUser) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }
    

    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User login successful",
      user: {
        id,
        email,
        // Include other necessary fields if needed
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


