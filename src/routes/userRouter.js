const loginUser = require("../auth/sign-in");
const {
  readUsersData,
  createUser,
  updateUsersData,
  deleteUsers,
  searchUser,
} = require("../controllers/userController");

// users
const userRoute = require(`express`).Router();
userRoute.get("/", readUsersData);
userRoute.get("/search/name/:name", searchUser);
userRoute.post("/user/create", createUser);
userRoute.post("/user/login", loginUser);
userRoute.delete("/user/delete/:id", deleteUsers);
userRoute.patch("/user/update/:id", updateUsersData);

module.exports = userRoute;
