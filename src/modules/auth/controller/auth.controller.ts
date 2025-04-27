import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/error-handler";
import { IUser } from "../../../interfaces";
import UserModel from "../../user/schemas/user.schema";
import * as bcryptjs from "bcryptjs"
import { sendResponse } from "../../../helpers";

export class AuthController {
	constructor() { }

	static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// console.log(req.body);

			if (!req.body || Object.keys(req.body).length === 0) return next(new AppError("fields are required", 400));

			const { full_name, email, phone_number, password }: Pick<IUser, 'full_name' | 'email' | 'phone_number' | 'password'> = req.body

			const [existingUser, hashedPassword] = await Promise.all([
				UserModel.findOne({ $or: [{ phone_number }, { email }] }).lean(),
				bcryptjs.hash(password, 8)
			]);

			if (existingUser) return next(new AppError("Email or phone number already exists", 409));

			const newUser = await UserModel.create({
				full_name,
				email,
				phone_number,
				password: hashedPassword,
			})

			const user = (await newUser.save()).toObject()
			delete user.password

			sendResponse(res, 201, `User registered successfully`, { user })
		} catch (error: any) {
			next(new AppError(error.message, 400))
		}
	}
}