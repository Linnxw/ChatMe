import express,{Router} from "express"
import {registerUser,loginUser,setAvatarImage,getAllUser,getUserById} from "../controllers/userController"
const router: Router = express.Router()

router.post("/auth/register",registerUser)
router.post("/auth/login",loginUser)
router.post("/auth/setavatar/:id",setAvatarImage)
router.get("/all/:id",getAllUser)
router.get("/:id",getUserById)

export default router