const db = require('../models');
const fs = require('fs');
const delFile = require('../utils/deleteFiles');
const Category = db.category;

module.exports = {
    create: async (params) => {
        let _params = {
            ...params
        }
        const iconPath = params.icon?.path;
        const iconBuffer = fs.readFileSync(iconPath);
        const iconBase64 =  Buffer.from(iconBuffer).toString('base64');
        _params.icon = iconBase64;
        delFile.deleteFiles(params.icon.path);
        return await new Category(_params);
    }
}