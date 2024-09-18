const fetch_data = require("../config/postgresFetchData");
const uploadImg = (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
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
  uploadImg,
  getImgData,
};
