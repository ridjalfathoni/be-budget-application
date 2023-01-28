const Transactions = require('../controllers/transactions.controllers');
const Middleware = require('../middleware/verifyToken');
module.exports = ((app,router) => {
    router.post('/addTransactions', Transactions.addTransaction)
    router.post('/getTransaction', Transactions.getTransaction)
    router.delete('/deleteTransactionByID', Transactions.deleteTransactionByID)
    router.put('/updateTransaction', Transactions.updateTransaction)
    app.use("/api/Transactions", router);
})
