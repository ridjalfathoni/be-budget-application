const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    verifyToken(req,res,next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.sendStatus(401);
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            
            req.users = {
                user_id: ObjectId(decoded.user_id),
                username: decoded.uname
            };
            next();
        })
    }
}