const userRoute = require("./userRouter");

const router = require(`express`).Router();

router.use(userRoute);

module.exports = router;
