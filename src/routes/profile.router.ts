import { Router } from "express"
import { authenticateToken } from "../middlewares/auth.middleware"
import { getProfile, updateProfile } from "../services/profile.service"

const router = Router()

router.get("/", authenticateToken, getProfile)
router.put("/", authenticateToken, updateProfile)

export default router
