const { getUser } = require("../controllers/userController")

const userRoute = require(`express`).Router()

userRoute.get("/", getUser)

module.exports = userRoute