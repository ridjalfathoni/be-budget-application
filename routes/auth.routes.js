const Auth = require('../controllers/auth.controllers');
const Middleware = require('../middleware/verifyToken');

module.exports = ((app,router) => {
    router.post('/login', Auth.login);
    router.post('/refreshToken', Auth.refreshToken);

    app.use("/api/auth", router);
})