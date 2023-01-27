const db = require('../models');
const Users = db.users;
module.exports = {
    test(req, res) {
        res.status(200).send({
            message: "test"
        })
    },
    registerUser: async (req, res) => {
        const { username, password } = req.body;
        const user = new Users({
            username: username == undefined ? username : username.toLowerCase(),
            password: password
        });
        try {
            await user.save();
            res.status(200).json({
                message: `User Berhasil Ditambahkan`,
                type: 'SUCCESS',
            })
        } catch (error) {
            const keyValue = error.keyValue;
            if (error.name === 'ValidationError') {
                res.status(400).json({
                    type: 'ERROR',
                    message: error.message.replace(/Users validation failed: /, "")
                });
            } else {
                const key = Object.keys(keyValue);
                res.status(400).json({
                    type: 'ERROR',
                    message: `${key} ${keyValue[key]} Sudah Ada`
                })
            }
        }
    },
    getUsers: async (req, res) => {
        try {
            const filter = req.body;
            const _data = await Users.aggregate([
                {
                    $project: {
                        _id: 0,
                        username: 1
                    }
                },
                {
                    $match: filter
                }
            ])

            res.status(200).send({
                message: "test",
                result: _data
            })
        } catch (error) {
            console.log(error);
        }
    },
}