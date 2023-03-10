module.exports = ((app,router) => {
    require('./users.routes')(app,router);
    require('./auth.routes')(app,router);
    require('./transactions.routes')(app,router);
    require('./category.routes')(app,router);
    require('./wallet.routes')(app,router);
})