const { readUsersData, createUser, updateUsersData } = require("../controllers/userController");

const userRoute = require(`express`).Router();

userRoute.get("/", readUsersData);
userRoute.post("/user/create", createUser);
userRoute.patch("/user/update/:id", updateUsersData);

module.exports = userRoute;
