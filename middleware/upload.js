const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, path.join(__dirname, '..', '/uploads/icon'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

module.exports = {
    uploadIcon: multer({storage: storage})
}