import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/error-handler";
import UserModel from "../modules/user/user.schema";

interface JwtPayload {
	sub: string;
	email: string;
	iat?: number;
	exp?: number;
}

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return next(new AppError("Authorization token not provided", 401));
		}

		const token = authHeader.split(" ")[1];
		const secretKey = process.env.SECRET_KEY;

		if (!secretKey) {
			return next(new AppError("JWT secret not configured", 500));
		}

		const decoded = jwt.verify(token, secretKey) as JwtPayload;

		if (!decoded?.sub) {
			return next(new AppError("Invalid token", 401));
		}

		const user = await UserModel.findOne({ _id: decoded.sub });

		if (!user) {
			return next(new AppError("Unauthorized user", 401));
		}

		(req as any).user = user;
		next();
	} catch (error: any) {
		if (error.name === 'TokenExpiredError') {
			return next(new AppError("Token has expired", 401));
		}
		if (error.name === 'JsonWebTokenError') {
			return next(new AppError("Invalid token", 401));
		}
		if (error instanceof Error) {
			return next(new AppError(error.message, 400));
		}
		return next(new AppError("Unknown error occurred", 500));
	}
};
