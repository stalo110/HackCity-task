"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const component_1 = __importDefault(require("../component"));
const router = express_1.default.Router();
router.get("/", (_, res) => res.status(200).json({ message: "success" }));
router.use("/api", component_1.default.task.routes);
router.use("/api", component_1.default.user.routes);
router.use("/api", component_1.default.leave.routes);
router.use("/api", component_1.default.PayRise.routes);
router.use("/api", component_1.default.project.routes);
exports.default = router;
