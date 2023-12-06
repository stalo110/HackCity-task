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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = require("nodemailer");
const sendMail = (mailObj) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, subject, text } = mailObj;
    try {
        let transporter = (0, nodemailer_1.createTransport)({
            host: process.env.SMTP_HOST,
            port: 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        let info = yield transporter.sendMail({
            from,
            to,
            subject,
            text,
        });
        console.log(`Message sent: ${info.messageId}`);
    }
    catch (error) {
        const err = error;
        throw new Error(`Something went wrong in the sendmail method.Error:${err.message}`);
    }
});
exports.sendMail = sendMail;
