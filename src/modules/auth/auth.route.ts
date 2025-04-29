import { Router } from "express"
import { AuthController } from "./auth.controller";
const authRoute = Router()

authRoute.post("/sign-up", AuthController.signUp)
authRoute.post("/sign-in", AuthController.signIn)

export default authRoute;