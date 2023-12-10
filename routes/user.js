import express from "express"
import { forgotPassword, getProfile, login, signUp } from "../controllers/user.js"
import { singleUpload } from "../middleware/multer.js"



const router = express.Router()

router.post('/login', login)
router.post('/signUp', singleUpload, signUp)
router.route("/forgetpassword").post(forgotPassword)




router.get('/me', getProfile)



export default router;