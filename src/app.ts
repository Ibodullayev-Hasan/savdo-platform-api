import { Application } from "express";
import { connectDB } from "./configs";
import route from "./routes";
import cors from "cors";

const expressApp = async (app: Application) => {

	app.use(
		cors({
			credentials: true,
			// origin:["http://127.0.0.1:5500"],
			origin: true,
			// allowedHeaders: ["application/json"],
			methods: ["PATCH", "GET", "POST", "OPTIONS", "DELETE"]
		}))

	connectDB()
		.then(() => { console.log(`Mongodb | successfully connected!`) })
		.catch((err) => { console.log(`Mongodb | ${err.message}`) })

	app.use(route)
}

export default expressApp;