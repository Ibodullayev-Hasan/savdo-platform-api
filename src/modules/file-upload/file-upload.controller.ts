import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/error-handler";
import { sendResponse } from "../../helpers";

export class FileUploadController {
	static async fileUploader(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const file = req.file

			if (!file) return next(new AppError("Fayl yuborilmadi!", 400))

			sendResponse(
				res,
				201,
				"File uploaded successfully!",
				{ fileUrl: `${req.protocol}://${req.get('host')}/uploads/${file.filename}` })

		} catch (error: any) {
			next(new AppError(error.message, 400))
		}
	}
}