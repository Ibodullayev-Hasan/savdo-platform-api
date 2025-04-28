import { AppError } from "../errors/error-handler";
import { IUser } from "../interfaces";
import * as jwt from "jsonwebtoken"
import "dotenv/config"

export class TokenHandler {
	static async tokenGenerator(user: IUser): Promise<{ access_token: string; refresh_token: string }> {
		const secretKey = process.env.SECRET_KEY as undefined as string
		const accTime = parseInt(process.env.ACCESS_TOKEN_TIME as string, 10);
		const refTime = parseInt(process.env.REFRESH_TOKEN_TIME as string, 10);

		if (!secretKey || !accTime || !refTime) {
			throw new AppError("Missing environment variables", 500);
		}

		const payload = { sub: user.id, email: user.email };

		const [access_token, refresh_token] = await Promise.all([
			jwt.sign(payload, secretKey, { expiresIn: accTime, algorithm: "HS512" }),
			jwt.sign(payload, secretKey, { expiresIn: refTime, algorithm: "HS512" }),
		]);

		return { access_token, refresh_token };
	}
}
