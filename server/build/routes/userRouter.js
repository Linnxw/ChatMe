"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/auth/register", userController_1.registerUser);
router.post("/auth/login", userController_1.loginUser);
router.post("/auth/setavatar/:id", userController_1.setAvatarImage);
router.get("/all/:id", userController_1.getAllUser);
router.get("/:id", userController_1.getUserById);
exports.default = router;
//# sourceMappingURL=userRouter.js.map