const userService = require('../services/users.services');

module.exports = {
    test(req, res) {
        res.status(200).send({
            message: "test"
        })
    },
    registerUser: async (req, res) => {
        try {
            const params = {
                ...req.body,
                username: req.body.username?.toLowerCase()
            }
            const user = await userService.create(params)
            await user.save();
            res.status(200).json({
                message: `User Berhasil Ditambahkan`,
                type: 'SUCCESS',
            })
        } catch (error) {
            const usernameError = error.errors?.username?.message
            const passwordError = error.errors?.password?.message

            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    status: 'error',
                    message: usernameError || passwordError
                });
            }
            return res.status(500).json({
                message: error
            })
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
                result: _data
            })
        } catch (error) {
            console.log(error);
        }
    },
    deleteUserByUsername: async(req,res) => {
        const data = req.body;
        if (!data.username) {
            res.status(400).json({
                type: 'ERROR',
                message: 'Tidak ada data yang dihapus'
            });
        }
        try {
            await Users.deleteMany({username:{$in:data}})
            const users = await Users.find().populate('role', 'role');
            res.status(200).send({
                message: "User Berhasil dihapus",
            })
        } catch (error) {
            res.status(400).json({
                type: 'ERROR',
                message: `User '${data.username}' tidak ada`
            });
        }
    },
}