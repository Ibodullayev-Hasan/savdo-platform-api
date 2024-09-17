const fetch_data = require("../config/postgresFetchData")
const { verify_mtd } = require("../utils/jwt")



const verify_token = () => {
   return async(req, res, next) => {
    let { token } = req.headers
    
    if(!token){
        res.status(404).send({
            success: false,
            message: "🧐 Token not available 🤷‍♂️"
        })
        return
    }

    let { id } = verify_mtd(token)
 
    let [user] = await fetch_data("Select * from users where id = $1", id)
  
    if(user){
      req.userId = user.id
     
      next()
    } else {
        res.status(403).send({
            success: false,
            message: "token error ⚡"
        })
    }
   }
}

module.exports = verify_token