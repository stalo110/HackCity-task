"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = require("http");
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../db"));
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const server = (0, http_1.createServer)(app_1.default);
db_1.default.sync().then(() => console.log("database connected successfully"));
app_1.default.listen(port, () => {
    console.log(`server is live on http://localhost:${port}`);
});
// {alter: true}
