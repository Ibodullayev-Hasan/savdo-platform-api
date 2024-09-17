const fetch_data = require("../config/postgresFetchData");
const { sign_mtd } = require("../utils/jwt");

// sign in
const loginUser = async (req, res) => {
  try {
    let { password, username } = req.body;

    let [checkUser] = await fetch_data(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      username,
      password
    );

    if (!checkUser) {
      return res.status(404).send({
        success: false,
        message: "not found user",
      });
    }

    let token = sign_mtd({ id: checkUser.id });
    res.status(200).send({
      success: false,
      message: "User successfully",
      data: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = loginUser;
