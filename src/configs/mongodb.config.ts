import "dotenv/config"
import mongoose from "mongoose";

const uri = process.env.URL as string;

export const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
			timeoutMS: 5000,
			mongodbLogPath: "stderr"
		})
	} catch (error: any) {
		throw new Error(error.message)
	}
}