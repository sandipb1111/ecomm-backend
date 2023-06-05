import { Router } from "express"
import {
    getProductById,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller"
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware"
import { createAdminDto } from "../valdator/user.validate"
import { validate } from "../utils/validate"

const router = Router()

router.get("/:id", authenticateToken, isAdmin, getProductById)
router.get("/", authenticateToken, isAdmin, getAllProducts)
router.post("/", validate(createAdminDto), postProduct)
router.patch("/:id", authenticateToken, isAdmin, updateProduct)
router.delete("/:id", authenticateToken, isAdmin, deleteProduct)

export default router
