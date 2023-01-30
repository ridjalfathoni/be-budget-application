const db = require('../models');
const userService = require('./users.services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (params) => {
        const { username, password } = params;
        const user = await userService.find({ username: username })

        const match = await bcrypt.compare(password, user?.[0].password);

        if (!match) throw new Error({
            status: 400,
            message: "Password salah."
        })
        const user_id = user?.[0]._id;
        const uname = user?.[0].username;
        const accessToken = jwt.sign({ user_id, uname }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({ user_id, uname }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        const data = {
            filter: { username: uname },
            data: { refreshToken }
        }

        await userService.update(data);

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    },
    refreshToken: async (params) => {
        const { refreshToken } = params;
        
        const user = await userService.find({ refreshToken: refreshToken })
        
        if (!user) {
            return res.sendStatus(403);
        }

        let accessToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("error", err);
            }

            const user_id = decoded?.user_id;
            const uname = decoded?.uname;
            const newAccessToken = jwt.sign({ user_id, uname }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });
            
            return newAccessToken
        })
        
        return {
            accessToken
        }
    }
}