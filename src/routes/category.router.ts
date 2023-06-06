import { Router } from "express"
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware"
import {
    postCategory,
    updateCategory,
    getAllCategory,
    getCategory,
    deleteCategory,
} from "../controllers/category.controller"
import { validate } from "../utils/validate"
import { categoryValidate } from "../valdator/product.validate"

const router = Router()

//router.get("/", authenticateToken, getCategory)
router.get("/", getAllCategory) // accessible by non admin user too
router.post("/", validate(categoryValidate), isAdmin, postCategory)
router.patch("/:id", authenticateToken, isAdmin, updateCategory)
router.delete("/:id", authenticateToken, isAdmin, deleteCategory)

export default router
