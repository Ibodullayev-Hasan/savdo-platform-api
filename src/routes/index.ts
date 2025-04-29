import { Router } from "express"
import fileUploadRoute from "../modules/file-upload/file-upload.route";
import authRoute from "../modules/auth/auth.route";
import userRoute from "../modules/user/user.route";
const route = Router()

route.use("/auth", authRoute);
route.use("/user", userRoute);
route.use("/avatar", fileUploadRoute);

export default route;