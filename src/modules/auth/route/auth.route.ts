import { Router } from "express"
import { AuthController } from "../controller/auth.controller"
const userRoute = Router()

userRoute.post("/sign-up", AuthController.signUp)

export default userRoute;