const {
  readUsersData,
  createUser,
  updateUsersData,
  deleteUsers,
  searchUser,
} = require("../controllers/userController");

const userRoute = require(`express`).Router();

userRoute.get("/", readUsersData);
userRoute.get("/search/name/:name", searchUser);
userRoute.post("/user/create", createUser);
userRoute.patch("/user/update/:id", updateUsersData);
userRoute.delete("/user/delete/:id", deleteUsers);

module.exports = userRoute;
