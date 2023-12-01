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
exports.sendMessage = exports.getAllMessage = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const getAllMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.body;
    try {
        const message = yield messageModel_1.default.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1 });
        const projectMessage = message.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text
            };
        });
        res.status(200).json({ status: true, projectMessage, msg: "succes get nessage" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    }
});
exports.getAllMessage = getAllMessage;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, message } = req.body;
    try {
        const createMessage = yield messageModel_1.default.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        });
        res.status(200).json({
            status: true,
            message: "succes send message"
        });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
        console.log(err.message);
    }
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=messageController.js.map