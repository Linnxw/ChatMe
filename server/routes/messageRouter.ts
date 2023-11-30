import express,{Router} from "express"
import {getAllMessage,sendMessage} from "../controllers/messageController"
const router: Router = express.Router()

router.post("/send",sendMessage)
router.post("/getAll",getAllMessage)

export default router