import { Router } from "express"
import userRouter from "../routes/user.router"
import authRouter from "../routes/auth.router"
import productRouter from "../routes/product.route"
const routers = Router()

routers.use("/auth", authRouter)
routers.use("/users", userRouter)
routers.use("/products", productRouter)

export default routers
