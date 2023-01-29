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
                status: 'success',
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
            const _data = await userService.get(req.users)
            return res.status(200).send({
                result: _data
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    deleteUserByUsername: async(req,res) => {
        try {
            if (!req.body.username) {
                return res.status(400).json({
                    message: "User tidak ditemukan."
                })
            }
            const params = {
                username: {
                    $in: req.body.username
                }
            }
            await userService.delete(params)
            return res.status(200).send({
                message: "User berhasil dihapus.",
                status: 'success'
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            if (!req.body.username) {
                return res.status(400).json({
                    message: "User tidak ditemukan.",
                    status: 'error'
                })
            }
            const params = {
                filter: {
                    username: req.body.username
                },
                data: {
                    ...req.body
                }
            }
            const user = await userService.update(params)
            return res.status(200).send({
                message: "User berhasil diupdate.",
                status: 'success',
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    }
}