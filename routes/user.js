import express from "express"
import { changePassword, forgotPassword, getProfile, login, logout, resetPassword, signUp, updateProfile } from "../controllers/user.js"
import { singleUpload } from "../middleware/multer.js"
import { isAuthenticated } from "../middleware/auth.js"



const router = express.Router()

router.post('/login', login)
router.post('/signUp', singleUpload, signUp)
router.route("/forgetpassword").post(forgotPassword).put(resetPassword)
router.get('/me', isAuthenticated,  getProfile)
router.get('/logout', isAuthenticated,  logout)



// updateRoutes 
router.put("/changepassword", isAuthenticated, changePassword)
router.put('/updateprofile', isAuthenticated, updateProfile)


export default router;