import {  getMyProfile, login, logout, signUp } from "../controllers/user.js"
import express from  "express"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.route('/signUp').post(signUp)
router.route('/login').post(login)
router.get('/me', isAuthenticated, getMyProfile)
router.get('/logout', isAuthenticated, logout)




export default router;