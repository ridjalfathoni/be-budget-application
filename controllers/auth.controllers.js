const db = require('../models');
const Users = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        const {username, password} = req.body;
        try {
            let user = await Users.findOne({username: username})
            
            const match = await bcrypt.compare(password, user.password);
            if(!match) return res.status(400).send({message: "Password Salah!"});
            
            const uname = user.username;
            const accessToken = jwt.sign({uname}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });

            const refreshToken = jwt.sign({uname}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            await Users.findOneAndUpdate({username: user.username}, {refreshToken: refreshToken})
            
            res.status(200).send({
                message: "Login Berhasil!",
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        } catch (error) {
            res.status(400).send({
                message: `Username / Email Tidak Ditemukan!`
            })
        }
    },
    async refreshToken(req,res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.sendStatus(401);
            }

            const user = await Users.findOne({refreshToken: refreshToken})
            if (!user) {
                return res.sendStatus(403);
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                }

                const uname = user.username;
                const accessToken = jwt.sign({uname}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '20s'
                });
                
                res.status(200).send({
                    accessToken: accessToken,
                })
            })

        } catch (error) {
        }
    },
}