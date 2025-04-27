import { IUser } from "../interfaces";
import { Multer } from "multer"

declare global {
	namespace Express {
		export interface Request {
			user?: IUser;
			file?: Express.Multer.File;
		}
	}
}