import { Router } from "express"
import { FileUploadController } from "./file-upload.controller";
import upload from "../../middlewares/multer.middleware";
const fileUploadRoute = Router()

fileUploadRoute.post("/upload", upload.single("file"), FileUploadController.fileUploader)

export default fileUploadRoute;