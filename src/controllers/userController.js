const fetch_data = require("../config/postgresFetchData");

const getUser = async (req, res) => {
  try {
    let userData = await fetch_data("SELECT * FROM users");

    return res.status(200).send({
      success: true,
      message: `users data`,
      data: userData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
    getUser
}