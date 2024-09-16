const fetch_data = require("../config/postgresFetchData");

// image upload
const imgUpload = async (req, res) => {
  try {
    let { userid } = req.body;
    let imglink = req.file.filename;
    // console.log(req.body);

    let [checkId] = await fetch_data(
      "SELECT * FROM users WHERE id = $1",
      userid
    );

    if (!checkId) {
      return res.status(404).send({
        success: false,
        message: "This userId does not exist in the users table",
      });
    }

    let [existImg] = await fetch_data(
      "SELECT * FROM users_img WHERE userid = $1",
      userid
    );

    if (existImg) {
      return res.status(409).send({
        success: false,
        message: "User img with this id already exists",
      });
    }

    await fetch_data(
      "INSERT INTO users_img(userid, imglink) VALUES($1, $2)",
      userid,
      imglink
    );

    let endUserImg = await fetch_data(
      "SELECT * FROM users_img WHERE userid = $1",
      userid
    );

    return res.status(201).send({
      success: true,
      message: "Img uploaded successfully",
      data: endUserImg.at(-1),
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// image read
const getImgData = async (req, res) => {
  try {
    const dataImg = await fetch_data("SELECT * FROM users_img");

    return res.status(200).send({
      success: true,
      message: "Get data successfully",
      data: dataImg,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  imgUpload,
  getImgData,
};
