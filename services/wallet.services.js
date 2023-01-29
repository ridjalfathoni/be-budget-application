const db = require('../models');
const Wallet = db.wallet;

module.exports = {
    get: async (params) => {
        return await Wallet.aggregate([
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
                                username:1
                            }
                        },
                    ]
                }
            },
            {
                $set: {
                    username: { $arrayElemAt: ["$user.username", 0] },
                }
            },
            {
                $match: params
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    name: 1,
                    balance: 1
                }
            }
        ])
    },
    find: async (params) => {
        return await Wallet.find(params)
    },
    create: async (params) => {
        return await new Wallet(params);
    },
    delete: async (params) => {
        return await Wallet.deleteMany(params)
    },
    update: async (params) => {
        return await Wallet.findOneAndUpdate(params.filter, params.data, { new: true })
    }
}