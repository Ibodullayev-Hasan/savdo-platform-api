const fetch_data = require("../config/postgresFetchData")
const { verify_mtd } = require("../utils/jwt")


const verifyRole = (...roles) => {
   return async(req, res, next) => {
    let { token } = req.headers

    if(!token){
        res.status(403).send({
            success: false,
            message: "🧐 Token not available 🤷‍♂️",
        })
        return
    }

    let { id } = verify_mtd(token)

    let [user] = await fetch_data("Select * from users where id = $1", id)

    if(user){
       if(roles.find(el => el == user.role)){
        next()
       } else {
        res.status(403).send({
            success: false,
            message: "You are not allowed ⚠️",
        })
       }
    } else {
        res.status(403).send({
            success: false,
            message: "Token error ⚡",
        })
    }
   }
}

module.exports = verifyRole