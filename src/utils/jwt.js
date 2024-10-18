require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);
const secret = process.env.SECRET_KEY;

const sign_mtd = (payload) => {
  try {
    return jwt.sign(payload, secret, {expiresIn: '1d'});
  } catch (error) {
    throw new Error();
  }
};



const verify_mtd = (token) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error();
  }
};


module.exports = {
    sign_mtd,
    verify_mtd
}