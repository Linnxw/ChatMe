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
exports.getUserById = exports.getAllUser = exports.setAvatarImage = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const password_hash_1 = __importDefault(require("password-hash"));
const userService_1 = require("../services/userService");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const userCheck = yield userModel_1.default.findOne({ username });
    const emailCheck = yield userModel_1.default.findOne({ email });
    if (userCheck)
        return res.status(400).json({ status: false, msg: "Username is already used" });
    if (emailCheck)
        return res.status(400).json({ status: false, msg: "Email is already used" });
    const hashPassword = password_hash_1.default.generate(password);
    const user = yield userModel_1.default.create({
        username: username.toLowerCase(),
        email,
        password: hashPassword
    });
    user.password = "";
    res.status(201).json({ status: true, data: user, msg: "Register successfully!" });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const isUsernameRegistered = yield (0, userService_1.checkUsername)(username.toLowerCase());
        if (!isUsernameRegistered)
            return res.status(400).json({ status: false, msg: "Username not registered" });
        const checkPassword = password_hash_1.default.verify(password, isUsernameRegistered.password);
        if (!checkPassword)
            return res.status(400).json({ status: false, msg: "invalid password" });
        isUsernameRegistered.password = "";
        res.status(200).json({ status: true, data: isUsernameRegistered, msg: "login successfully" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.loginUser = loginUser;
const setAvatarImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { avatarImage } = req.body;
        const { id } = req.params;
        const user = yield userModel_1.default.findByIdAndUpdate(id, {
            isAvatarImageSet: true,
            avatarImage
        });
        if (!user)
            return res.sendStatus(401);
        return res.status(200).json({ isSet: user.isAvatarImageSet, avatarImage: user.avatarImage });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
        console.log(err);
    }
});
exports.setAvatarImage = setAvatarImage;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const users = yield userModel_1.default.find({ _id: { $ne: id } }).select([
            "username", "avatarImage", "_id"
        ]);
        res.status(200).json({ status: true, data: users, msg: "get all users" });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ _id: req.params.id }).select(["_id", "username", "avatarImage"]);
        res.status(200).json({ status: true, user, msg: "succes get user by id: " + req.params.id });
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map