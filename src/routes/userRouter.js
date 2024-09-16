const {
  readUsersData,
  createUser,
  updateUsersData,
  deleteUsers,
  searchUser,
} = require("../controllers/userController");

const { imgUpload, getImgData } = require("../controllers/userImgController");
const uploadMiddlewareFn = require("../middlewares/uploadMiddleware");

const userRoute = require(`express`).Router();
// users
userRoute.get("/", readUsersData);
userRoute.get("/search/name/:name", searchUser);
userRoute.post("/user/create", createUser);
userRoute.patch("/user/update/:id", updateUsersData);
userRoute.delete("/user/delete/:id", deleteUsers);

// users img
userRoute.post("/user/img/upload", uploadMiddlewareFn("image"), imgUpload);
userRoute.get("/user/img", getImgData);

module.exports = userRoute;
