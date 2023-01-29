const db = require('../models');
const fs = require('fs');
const delFile = require('../utils/deleteFiles');
const Category = db.category;
const Users = db.users;

module.exports = {
    get: async (params) => {
        return await Category.aggregate([
            {
                $addFields: {
                    user_id: {
                        $ifNull: ['$user_id', params.user_id]
                    }
                }
            },
            {
                $lookup: {
                    from: Users.collection.name,
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                username: 1
                            }
                        }
                    ]
                }
            },
            {
                $set: {
                    username: {
                        $arrayElemAt: ["$user.username", 0]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    name: 1,
                    icon: 1,
                    type: 1
                }
            }
        ])
    },
    find: async (params) => {
        return await Category.find(params)
    },
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
    },
    delete: async (params) => {
        return await Category.deleteMany(params)
    },
    update: async (params) => {
        const iconPath = params.data?.icon?.path;
        const iconBuffer = fs.readFileSync(iconPath);
        const iconBase64 = Buffer.from(iconBuffer).toString('base64');
        params.data.icon = iconBase64;
        delFile.deleteFiles(iconPath);
        return await Category.findOneAndUpdate(params.filter, params.data, {new:true})
    }
}