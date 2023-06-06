import { Router } from "express"
import {
    getProductById,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller"
import { authenticateToken, isAdmin } from "../middlewares/auth.middleware"
import { validate } from "../utils/validate"
import { productValidate } from "../valdator/product.validate"

const router = Router()

router.get("/:id", authenticateToken, isAdmin, getProductById)
router.get("/", authenticateToken, getAllProducts) // accessible by non admin user too
router.post("/", validate(productValidate), postProduct)
router.patch("/:id", authenticateToken, isAdmin, updateProduct)
router.delete("/:id", authenticateToken, isAdmin, deleteProduct)

export default router
