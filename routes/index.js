module.exports = ((app,router) => {
    require('./users.routes')(app,router);
})