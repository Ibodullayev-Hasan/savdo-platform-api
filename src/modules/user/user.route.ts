import { Router } from "express"
import { UserController } from "./user.controller";
import { authTokenMiddleware } from "../../middlewares";
const userRoute = Router()

userRoute.get("/profile", authTokenMiddleware, UserController.userProfile)

export default userRoute;