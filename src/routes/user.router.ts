import { Router } from "express"
import * as userService from "../controllers/user.controller"
import { createAdminDto, createPostDto } from "../valdator/user.validate"
import { validate } from "../utils/validate"
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware"

const router = Router()

router.get("/:id", authenticateToken, isAdmin, userService.readOneUser)
router.get("/", authenticateToken, isAdmin, userService.readUser)
router.post("/", validate(createAdminDto), userService.postUser)
router.patch("/:id", authenticateToken, isAdmin, userService.updateUser)
router.delete("/:id", authenticateToken, isAdmin, userService.deleteUser)

export default router
