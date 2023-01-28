const db = require('../models');
const Transactions = db.transactions;
const Users = db.users;

module.exports = {
    addTransaction: async (req, res) => {
        const { username, amount, type, category, description } = req.body;
        const _user = await Users.findOne({ username: username });
        const transactions = new Transactions({
            user_id: _user._id,
            amount: amount,
            type: type,
            category: category,
            description: description
        });
        try {
            await transactions.save();
            res.status(200).json({
                message: `Transactions Berhasil Ditambahkan`,
                type: 'SUCCESS',
            })
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({
                    type: 'ERROR',
                    message: error.message.replace(/Transactions validation failed: /, "")
                });
            }
        }
    },
    getTransaction: async (req, res) => {
        try {
            const filter = req.body;
            const _data = await Transactions.aggregate([
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
                    $match: filter
                },
                {
                    $project: {
                        user: 0
                    }
                },
            ])

            res.status(200).send({
                result: _data
            })
        } catch (error) {
            console.log(error);
        }
    },
    deleteTransactionByID: async (req, res) => {
        const data = req.body;
        
        try {
            await Transactions.deleteMany({ _id: { $in: data } });
            res.status(200).send({
                message: "Transaction Berhasil dihapus",
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateTransaction: async (req, res) => {
        const data = req.body;
        
        try {
            const transaction = await Transactions.findOneAndUpdate({ _id: data.id },data,{ new: true })
            const user = await Users.findOne({_id: transaction.user_id});
            if (transaction.type === "income") {
                user.balance -= transaction.amount;
            } else if(transaction.type === "expense") {
                user.balance += transaction.amount;
            }
            await user.save()
            res.status(200).send({
                type: 'SUCCESS',
                message: "Transaction Berhasil diupdate",
                data: transaction
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}