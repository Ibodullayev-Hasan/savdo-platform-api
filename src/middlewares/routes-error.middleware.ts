import { Request, Response, NextFunction } from "express";

export const allowedRoutes: { [path: string]: string[] } = {
	"/auth/sign-up": ["POST"],
	"/auth/sign-in": ["POST"],
	"/auth/refresh": ["POST"],
	"/auth/logout": ["POST"],
	"/avatar/upload": ["POST"],
	"/user/profile": ["GET"],
};


export const routeErrorHandler = (req: Request, res: Response, next: NextFunction) => {
	const methods = allowedRoutes[req.path];

	if (methods) {
		// route mavjud, lekin method ruxsat etilmagan
		if (!methods.includes(req.method)) {
			return res.status(405).json({
				success: false,
				message: "Method not allowed"
			});
		}
	} else {
		// route umuman yo‘q
		return res.status(404).json({
			success: false,
			message: "Route not found"
		});
	}

	next();
}

