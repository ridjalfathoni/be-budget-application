const db = require('../models');
const Transactions = db.transactions;
const Users = db.users;

module.exports = {
    get: async (params) => {
        return await Transactions.aggregate([
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
                    amount: 1,
                    type: 1,
                    category: 1,
                    description: 1,
                    created_at: 1,
                    username: 1,
                    user_id: 1,
                    wallet_id: 1
                }
            }
        ])
    },
    find: async (params) => {
        return await Transactions.find(params)
    },
    create: async (params) => {
        return await new Transactions(params);
    },
    delete: async (params) => {
        return await Transactions.deleteMany(params)
    },
    update: async (params) => {
        return await Transactions.findOneAndUpdate(params.filter, params.data, {new: true})
    }
}