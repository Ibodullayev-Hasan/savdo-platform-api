import { Application } from "express";
import { connectDB } from "./configs";
import route from "./routes";

const expressApp = async (app: Application) => {

	connectDB()
		.then(() => { console.log(`Mongodb | successfully connected!`) })
		.catch((err) => { console.log(`Mongodb | ${err.message}`) })

	app.use(route)
}

export default expressApp;