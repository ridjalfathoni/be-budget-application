const Transactions = require('../controllers/transactions.controllers');
const Middleware = require('../middleware/verifyToken');
module.exports = ((app,router) => {
    router.post('/addTransactions', Middleware.verifyToken, Transactions.addTransactions);
    router.get('/getAllTransactions', Middleware.verifyToken, Transactions.getAllTransactions);
    router.delete('/deleteTransactionsByID', Middleware.verifyToken, Transactions.deleteTransactionsByID);
    router.put('/updateTransactions', Middleware.verifyToken, Transactions.updateTransactions);
    app.use("/api/transactions", router);
})
