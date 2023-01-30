const Transactions = require('../controllers/transactions.controllers')
const Middleware = require('../middleware/verifyToken');
module.exports = ((app,router) => {
    router.post('/addTransactions', Middleware.verifyToken, Transactions.addTransaction);
    router.get('/getAllTransactions', Middleware.verifyToken, Transactions.getTransaction);
    router.delete('/deleteTransactionsByID', Middleware.verifyToken, Transactions.deleteTransactionByID);
    router.put('/updateTransactions', Middleware.verifyToken, Transactions.updateTransaction);
    app.use("/api/transactions", router);
})
