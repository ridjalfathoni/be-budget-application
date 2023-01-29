const Category = require('../controllers/category.controllers');
const Middleware = require('../middleware/verifyToken');
const Upload = require('../middleware/upload');

module.exports = ((app,router) => {
    router.post('/addCategory',  [Middleware.verifyToken, Upload.uploadIcon.single('icon')], Category.addCategory);
    router.get('/getAllCategory',  [Middleware.verifyToken], Category.getAllCategory);
    router.delete('/deleteCategoryByID',  [Middleware.verifyToken], Category.deleteCategoryByID);
    router.put('/updateCategory', [Middleware.verifyToken, Upload.uploadIcon.single('icon')], Category.updateCategory);
    app.use("/api/category", router);
})
