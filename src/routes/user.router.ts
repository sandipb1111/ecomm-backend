import { Router } from "express"
import { postUser } from "../controllers/user.controller"
import { createPostDto } from "../valdator/user.validate"
import { validate } from "../utils/validate"

const router = Router()

router.post("/", validate(createPostDto), postUser)

export default router
