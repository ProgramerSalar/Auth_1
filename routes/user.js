import express from "express"
import { getProfile, login, signUp } from "../controllers/login.js"
import { singleUpload } from "../middleware/multer.js"



const router = express.Router()

router.post('/login', login)
router.post('/signUp', singleUpload, signUp)
router.get('/me', getProfile)



export default router;