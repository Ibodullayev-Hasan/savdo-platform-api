import { Router } from "express"
import userRoute from "../modules/auth/route/auth.route"
const route = Router()

route.use("/auth", userRoute);

export default route;