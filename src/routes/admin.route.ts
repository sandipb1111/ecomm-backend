import { Router } from "express"
import * as adminController from "../controllers/admin.controller"
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware"
import { createAdminDto } from "../valdator/user.validate"
import { validate } from "../utils/validate"

const router = Router()

router.get("/:id", authenticateToken, isAdmin, adminController.readOneUser)
router.get("/", authenticateToken, adminController.readUser)
router.post("/", validate(createAdminDto), adminController.postUser)
router.patch("/:id", authenticateToken, isAdmin, adminController.updateUser)
router.delete("/:id", authenticateToken, isAdmin, adminController.deleteUser)

export default router
