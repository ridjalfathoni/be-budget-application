const Wallet = require("../controllers/wallet.controllers.js")
const Middleware = require('../middleware/verifyToken');
module.exports = ((app,router) => {
    router.post('/addWallet', Middleware.verifyToken, Wallet.addWallet);
    app.use("/api/wallet", router);
})
