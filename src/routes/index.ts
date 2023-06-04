import { Router } from "express"
import userRouter from "../routes/user.router"
import authRouter from "../routes/auth.router"
import adminRouter from "../routes/admin.route"
const routers = Router()

routers.use("/auth", authRouter)
routers.use("/admin", adminRouter)
routers.use("/users", userRouter)

export default routers
