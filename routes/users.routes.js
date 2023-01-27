const Users = require('../controllers/users.controllers');
module.exports = ((app,router) => {
    router.get('/', Users.test);
    router.post('/registerUser', Users.registerUser)
    app.use("/api/Users", router);
})
