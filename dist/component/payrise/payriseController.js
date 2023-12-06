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
exports.imageUpload = exports.updatePayrise = exports.getPayrise = exports.createPayrise = void 0;
const utils_1 = require("../../utils/utils");
const model_1 = require("./model");
const uuid_1 = require("uuid");
const cloudinary_1 = __importDefault(require("../../lib/helper/cloudinary"));
const createPayrise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        const validateResult = utils_1.createPayriseRequest.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const PayriseRecord = yield model_1.PayriseModel.create(Object.assign({ id }, req.body));
        return res.status(201).json({ msg: 'Payrise request created successfully', PayriseRecord });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createPayrise = createPayrise;
const getPayrise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllPayrise = yield model_1.PayriseModel.findAndCountAll();
    return res.status(201).json({
        msg: "You have successfully retrieved all data",
        count: getAllPayrise.count,
        payRise: getAllPayrise.rows,
    });
});
exports.getPayrise = getPayrise;
const updatePayrise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const validateResult = utils_1.updatePayriseRequest.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ error: validateResult.error.details[0].message });
        }
        const update = yield model_1.PayriseModel.findOne({ where: { id: id } });
        if (!update) {
            return res.status(400).json({
                error: "Non-existing Payrise Request",
            });
        }
        const updateRecord = yield update.update(Object.assign({}, req.body));
        return res.status(201).json({
            msg: "Update Successful",
            updateRecord,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updatePayrise = updatePayrise;
const imageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const uploadedImage = yield cloudinary_1.default.uploader.upload(req.file.path);
        res.status(200).json({ imageUrl: uploadedImage.secure_url });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.imageUpload = imageUpload;
