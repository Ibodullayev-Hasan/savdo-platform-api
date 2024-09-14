const fetch_data = require("../config/postgresFetchData");

// C
const createUser = async (req, res) => {
  try {
    let { fullName, email, password, userName, phoneNumber } = req.body;

    // "userName" ustunini qo'shtirnoq bilan yozamiz
    let [existUser] = await fetch_data(
      'SELECT * FROM users WHERE "userName" = $1',
      userName
    );

    if (existUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    await fetch_data(
      'INSERT INTO users("fullName", email, password, "userName", "phoneNumber") VALUES($1, $2, $3, $4, $5)',
      fullName,
      email,
      password,
      userName,
      phoneNumber
    );

    let endUser = await fetch_data("SELECT * FROM users");

    return res.status(200).send({
      success: true,
      message: "New user created successfully",
      data: endUser.at(-1),
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// R
const readUsersData = async (req, res) => {
  try {
    let userData = await fetch_data("SELECT * FROM users");

    return res.status(200).send({
      success: true,
      message: "Users data",
      data: userData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// U
const updateUsersData = async (req, res) => {
  try {
    let { fullName, email, password, userName, phoneNumber } = req.body;
    let { id } = req.params;

    let [checkId] = await fetch_data("SELECT * FROM users WHERE id = $1", id);

    if (!checkId) {
      return res.status(404).send({
        success: false,
        message: `Not found`,
      });
    }

    await fetch_data(
      'UPDATE users SET "fullName" = $1, email = $2, password = $3, "userName" = $4, "phoneNumber" = $5 WHERE id = $6',
      fullName,
      email,
      password,
      userName,
      phoneNumber,
      id
    );

    let updatedUser = await fetch_data("SELECT * FROM users WHERE id = $1", id);

    return res.status(200).send({
      success: true,
      message: "Updated user",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  readUsersData,
  createUser,
  updateUsersData,
};
