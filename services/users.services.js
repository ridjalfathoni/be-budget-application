const db = require('../models');
const Users = db.users;

module.exports = {
    get: async (params) => {
        return await Users.aggregate([
            {
                $project: {
                    _id: 0,
                    username: 1
                }
            },
            {
                $match: params
            }
        ])
    },
    find: async (params) => {
        return await Users.find(params)
    },
    create: async (params) => {
        return await new Users(params);
    },
    delete: async (params) => {
        return await Users.deleteMany(params)
    },
    update: async (params) => {
        return await Users.findOneAndUpdate(params.filter, params.data, {new: true})
    }
}