const Users = require('../controllers/users.controllers');
const Middleware = require('../middleware/verifyToken');
module.exports = ((app,router) => {
    router.get('/', Users.test);
    router.post('/registerUser', Users.registerUser)
    router.post('/getUsers', Middleware.verifyToken, Users.getUsers)
    app.use("/api/Users", router);
})
