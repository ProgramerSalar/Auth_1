import express from "express"
import { login, signUp } from "../controllers/login.js"



const router = express.Router()

router.post('/login', login)
router.post('/signUp', signUp)



export default router;