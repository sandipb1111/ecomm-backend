import { Router } from "express"
import userRouter from "../routes/user.router"
import authRouter from "../routes/auth.router"
const routers = Router()

routers.use("/auth", authRouter)
routers.use("/users", userRouter)

export default routers
