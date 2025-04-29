import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/error-handler";
import { sendResponse } from "../../helpers";

export class UserController {
	static async userProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			sendResponse(res, 200, "User Profile", { user: req?.user })
		} catch (error: any) {
			next(new AppError(error.message, 400))

		}
	}
}