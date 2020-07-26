const  jwt  = require('jsonwebtoken')
const localStorage = require('localStorage')

module.exports = (req, res, next) => {
    try{
        let token = localStorage.getItem("TOKEN")
        const decoded = jwt.verify(token, "" + process.env.SECRET)
        req.userdata = decoded
        req.token = token
        next()
    }
    catch(error){
        console.log("auth failed")
        return res.status(401).send("Auth failed")
    }
}