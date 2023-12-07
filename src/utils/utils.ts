import bcryptjs, { genSalt } from "bcryptjs";
import Joi from "joi";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = async (input: Record<string, string>) => {
  console.log(process.env.JWT_SECRET);
  return Jwt.sign(input, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export const verify = async (token: string) => {
  try {
    const verify = Jwt.verify(token, process.env.JWT_SECRET as string);
    return verify;
  } catch (error) {
    return "token expired";
  }
};

export const bcryptEncoded = async (value: { value: string }) => {
  return bcryptjs.hash(value.value, await genSalt());
};

export const bcryptDecode = (password: string, comparePassword: string) => {
  return bcryptjs.compare(password, comparePassword);
};

export const generatePasswordResetToken = (): number => {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcryptjs.hash(password, bcryptjs.genSaltSync());
};

export const comparePasswords = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashedPassword);
};


export const registerUsersSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9]{3,18}$/)
    .required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};




export const loginUsersSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9]{3,18}$/)
    .required(),
});





