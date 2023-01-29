const Category = require('../controllers/category.controllers');
const Middleware = require('../middleware/verifyToken');
const Upload = require('../middleware/upload');

module.exports = ((app,router) => {
    router.post('/addCategory',  [Middleware.verifyToken, Upload.uploadIcon.single('icon')], Category.addCategory);
    app.use("/api/category", router);
})
