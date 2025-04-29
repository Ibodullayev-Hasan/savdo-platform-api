import { Router } from "express"
import { AuthController } from "./auth.controller";
import { authTokenMiddleware } from "../../middlewares";
const authRoute = Router()

authRoute.post("/sign-up", AuthController.signUp)
authRoute.post("/sign-in", AuthController.signIn)
authRoute.post("/refresh", authTokenMiddleware, AuthController.refresh)

export default authRoute;