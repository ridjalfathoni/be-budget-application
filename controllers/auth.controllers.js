const authService = require('../services/auth.services');

module.exports = {
    async login(req, res) {
        try {
            let login = await authService.login(req.body)
            return res.status(200).send({
                message: "Login Berhasil!",
                status: 'success',
                data: login
            })
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: 'error'
            })
        }
    },
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.sendStatus(401);
            }
            let token = await authService.refreshToken(req.body);

            return res.status(200).send({
                ...token
            })
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: 'error'
            })
        }
    },
}