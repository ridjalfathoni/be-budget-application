const Wallet = require("../controllers/wallet.controllers.js")
const Middleware = require('../middleware/verifyToken');
module.exports = ((app,router) => {
    router.post('/addWallet', Middleware.verifyToken, Wallet.addWallet);
    router.get('/getListWallet', Middleware.verifyToken, Wallet.getListWallet);
    app.use("/api/wallet", router);
})
