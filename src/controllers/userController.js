const fetch_data = require("../config/postgresFetchData");
const { sign_mtd } = require("../utils/jwt");

// C
const createUser = async (req, res) => {
  try {
    let { fullname, email, password, username, phonenumber, img_url } = req.body;

    let [existUser] = await fetch_data(
      'SELECT * FROM users WHERE "username" = $1 OR "email" = $2',
      username,
      email
    );

    if (existUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    };

    await fetch_data(
      'INSERT INTO users("fullname", email, password, "username", "phonenumber", "img_url") VALUES($1, $2, $3, $4, $5, $6)',
      fullname,
      email,
      password,
      username,
      phonenumber,
      img_url
    );

    let [findUser] = await fetch_data(
      'SELECT * FROM users WHERE "username" = $1 AND "email" = $2',
      username,
      email
    );
    let token = sign_mtd({ id: findUser.id });

    let endUser = await fetch_data("SELECT * FROM users");

    return res.status(201).send({
      success: true,
      message: "New user created successfully",
      data: endUser.at(-1),
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



// search
const searchUser = async (req, res) => {
  try {
    let { name } = req.params;

    let userData = await fetch_data(
      "SELECT * FROM users WHERE fullname ILIKE $1",
      `%${name}%`
    );

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
    let { fullname, email, password, username, phonenumber } = req.body;
    let { id } = req.params;

    let [checkId] = await fetch_data("SELECT * FROM users WHERE id = $1", id);

    if (!checkId) {
      return res.status(404).send({
        success: false,
        message: `Not found`,
      });
    }

    await fetch_data(
      'UPDATE users SET "fullname" = $1, email = $2, password = $3, "username" = $4, "phonenumber" = $5 WHERE id = $6',
      fullname,
      email,
      password,
      username,
      phonenumber,
      id
    );

    let updatedUser = await fetch_data("SELECT * FROM users WHERE id = $1", id);

    return res.status(204).send({
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

// D
const deleteUsers = async (req, res) => {
  try {
    let { id } = req.params;

    let [checkId] = await fetch_data("SELECT * FROM users WHERE id = $1", id);
    if (!checkId) {
      return res.status(404).send({
        success: false,
        message: `User not found`,
      });
    }

    await fetch_data("DELETE FROM users WHERE id = $1", id);

    return res.status(200).send({
      success: true,
      message: `Successfully deleted user`,
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
  deleteUsers,
  searchUser,
};
