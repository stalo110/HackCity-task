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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../../component/User/model");
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
_a = AuthMiddleware;
AuthMiddleware.Authenticate = (auth) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res
                .status(401)
                .json({ error: "unauthorized, no token provided" });
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ error: "unauthorized" });
        }
        const { id, exp } = verified;
        const user = (yield model_1.UserModel.findOne({
            where: { id },
        }));
        if (!user) {
            return res.status(401).json({ error: "unauthorized" });
        }
        if (exp !== undefined) {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            // Check if the token has expired by comparing the expiration time with the current time
            const isTokenExpired = currentTimeInSeconds >= exp;
            if (isTokenExpired) {
                return res.status(401).json({ error: "Token expired" });
            }
        }
        // Get the current time in seconds since the UNIX epoch
        if (!auth.includes(user.role)) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user.id;
        next();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
