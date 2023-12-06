import express from "express"
import { getProfile, login, signUp } from "../controllers/login.js"



const router = express.Router()

router.post('/login', login)
router.post('/signUp', signUp)
router.get('/me', getProfile)



export default router;