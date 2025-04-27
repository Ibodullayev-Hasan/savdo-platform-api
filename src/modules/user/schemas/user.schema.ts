import { model, Schema } from "mongoose";
import { IUser } from "../../../interfaces";

const userSchema = new Schema<IUser>(
	{
		full_name: { type: String, required: true },
		phone_number: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select:false },
		avatar_uri: { type: String, default: "https://examle.com/user-avatar" },
		location: { type: String, default: null },
		user_market: { type: String, default: null },
	},
	{
		timestamps: true,
	}
)

const UserModel = model<IUser>("User", userSchema);

export default UserModel;