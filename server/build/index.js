"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});
const onlineUsers = new Map();
io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true
}));
mongoose_1.default.connect(process.env.DB)
    .then(() => {
    console.log("Mongodb connect!");
}).catch((err) => {
    console.log("mongoodb disconect", err);
});
app.use("/api/user/", routes_1.userRouter);
app.use("/api/message/", routes_1.messageRouter);
server.listen(process.env.PORT, () => {
    console.log("Server runing in Port:" + process.env.PORT);
});
//# sourceMappingURL=index.js.map