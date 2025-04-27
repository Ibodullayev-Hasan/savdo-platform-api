import express, { Application, NextFunction, Request, RequestHandler, Response } from "express"
import "dotenv/config"
import expressApp from "./app";
import { routeErrorHandler } from "./middlewares";
import { AppError } from "./errors/error-handler";
import path from "path";


const server = async () => {
	try {
		const app: Application = express();
		const port: number = process.env.SERVER_PORT as undefined as number || 3005;

		app.use(express.json())
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(process.cwd(), 'uploads')));

		expressApp(app)

		app.use(routeErrorHandler as unknown as RequestHandler)

		app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
			res.status(err.status || 500).json({
				success: false,
				message: err.message || 'Serverda xatolik yuz berdi',
			});
		});

		app.listen(port, () => {
			console.log(`Server run on port ${port} 🚀 `)
		})
	} catch (error: any) {
		if (error instanceof Error) {
			console.error(error.message)
		}
	}
}

server()
