const authService = require('../services/auth.services');

module.exports = {
    async login(req, res) {
        try {
            let login = await authService.login(req.body)
            res.status(200).send({
                message: "Login Berhasil!",
                status: 'success',
                data: login
            })
        } catch (error) {
            res.status(500).json({
                message: error,
                status: 'error'
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
            res.status(500).json({
                message: error,
                status: 'error'
            })
        }
    },
}