import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/error-handler";
import { IUser } from "../../interfaces";
import UserModel from "../user/user.schema";
import * as bcryptjs from "bcryptjs"
import { sendResponse, TokenHandler } from "../../helpers";

export class AuthController {

	// sign up
	static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (!req.body || Object.keys(req.body).length === 0) return next(new AppError("fields are required", 400));

			const { full_name, email, phone_number, password }: Pick<IUser, 'full_name' | 'email' | 'phone_number' | 'password'> = req.body

			const [existingUser, hashedPassword] = await Promise.all([
				UserModel.findOne({ $or: [{ phone_number }, { email }] }).lean(),
				bcryptjs.hash(password, 8)
			]);

			if (existingUser) return next(new AppError("Email or phone number already exists", 409));

			const newUser = new UserModel({
				full_name,
				email,
				phone_number,
				password: hashedPassword,
			})

			const [user, tokens] = await Promise.all([
				newUser.save({ validateBeforeSave: false }),
				TokenHandler.tokenGenerator(newUser)
			]);

			const userObj = user.toObject();
			delete userObj.password;

			sendResponse(res, 201, "User registered successfully", { user: userObj, access_token: tokens.access_token });
		} catch (error: any) {
			next(new AppError(error.message, 400))
		}
	}

	// sign in
	static async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (!req.body || Object.keys(req.body).length === 0) return next(new AppError("fields are required", 400));

			const { email, password }: Pick<IUser, 'email' | 'password'> = req.body

			const user: IUser = await UserModel.findOne({ email }).select("password")
			if (!user) return next(new AppError("unregistered email", 401))

			const [comparedPass, tokens] = await Promise.all([
				bcryptjs.compare(password, user.password),
				TokenHandler.tokenGenerator(user)
			])

			if (!comparedPass) return next(new AppError("Incorrect password", 401))

			// response
			sendResponse(
				res,
				200,
				"User successfully logged in",
				{
					access_token: tokens.access_token,
					refresh_token: tokens.refresh_token
				});

		} catch (error: any) {
			next(new AppError(error.message, 400))
		}
	}

	// refresh
	static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

			const user: IUser = req?.user

			const tokens = await TokenHandler.tokenGenerator(user)

			// response
			sendResponse(res, 200, "Token successfully refresh", { access_token: tokens.access_token });

		} catch (error: any) {
			next(new AppError(error.message, 400))
		}
	}
}