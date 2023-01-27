const db = require('../models');
const Users = db.users;

module.exports = {
    test(req, res) {
        res.status(200).send({
            message: "test"
        })
    },
    registerUser: async(req, res) => {
        const {username, password } = req.body;
        try {
            const user = new Users({
                username: username.toLowerCase(),
                password: password
            });
            const saveUser = await user.save();
            res.status(200).json({
                message: `User Berhasil Ditambahkan`,
                type: 'SUCCESS',
            })
        } catch (error) {
            console.log("error", error);
            const keyValue = error.keyValue;
            if (keyValue == undefined) {
                res.status(400).json({
                    message: `Role Belum Ada`,
                    type: 'ERROR'
                })
            } else {
                const key = Object.keys(keyValue);
                res.status(400).json({
                    type: 'ERROR',
                    message: `${key} ${keyValue[key]} Sudah Ada`
                })
            }
        }
    },
}