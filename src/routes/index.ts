import { Router } from "express"
import userRoute from "../modules/auth/route/auth.route"
import fileUploadRoute from "../modules/file-upload/file-upload.route";
const route = Router()

route.use("/auth", userRoute);
route.use("/avatar", fileUploadRoute);

export default route;