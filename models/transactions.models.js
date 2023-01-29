module.exports = (mongoose) => {
    const Transactions = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Username tidak boleh kosong.']
        },
        wallet_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallet',
            required: [true, 'Wallet tidak boleh kosong.']
        },
        amount: {
            type: Number,
            required: [true, 'Amount tidak boleh kosong.']
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, "Category tidak boleh kosong."]
        },
        description: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    });

    Transactions.pre('save', function (next) {
        const transaction = this;
        const Users = mongoose.models.Users

        if (transaction.isNew) {
            Users.findById(transaction.user_id, (err, user) => {
                if (err) {
                    next(err)
                } else {
                    if (transaction.type === 'income') {
                        user.balance += transaction.amount;
                    } else if (transaction.type === 'expense') {
                        user.balance -= transaction.amount
                    }
                    user.save((err) => {
                        if (err) {
                            next(err);
                        } else {
                            next()
                        }
                    })
                }
            })
        } else {
            next()
        }
    })
    Transactions.pre('deleteMany', async function(next) {
        const Users = mongoose.models.Users;
        const Transactions = mongoose.models.Transactions;
        try {
            const query = this.getQuery();
            const deletedTransactions = await Transactions.find(query);
            const user_id = deletedTransactions.map(transaction => transaction.user_id);
            const users = await Users.find({ _id: { $in: user_id } });
            for (let i = 0; i < deletedTransactions.length; i++) {
                const user = users.find(user => user._id.equals(deletedTransactions[i].user_id));
                if (deletedTransactions[i].type === "income") {
                    user.balance -= deletedTransactions[i].amount;
                } else if (deletedTransactions[i].type === 'expense') {
                    user.balance += deletedTransactions[i].amount;
                }
            }
            await Promise.all(users.map(user => user.save()));
            next();
        } catch (err) {
            next(err);
        }
    });
    Transactions.pre('findOneAndUpdate', async function(next) {
        const Users = mongoose.models.Users;
        const Transactions = mongoose.models.Transactions;
        try {
            const query = this.getQuery();
            const deletedTransactions = await Transactions.find(query);
            const user_id = deletedTransactions.map(transaction => transaction.user_id);
            const users = await Users.find({ _id: { $in: user_id } });
            for (let i = 0; i < deletedTransactions.length; i++) {
                const user = users.find(user => user._id.equals(deletedTransactions[i].user_id));
                if (deletedTransactions[i].type === "income") {
                    user.balance -= deletedTransactions[i].amount;
                } else if (deletedTransactions[i].type === 'expense') {
                    if (Math.sign(user.balance) > 0) {
                        user.balance -= deletedTransactions[i].amount;
                    } else {
                        user.balance += deletedTransactions[i].amount;
                    }
                }
            }
            await Promise.all(users.map(user => user.save()));
            next();
        } catch (err) {
            next(err);
        }
    });

    return mongoose.model('Transactions', Transactions);
}