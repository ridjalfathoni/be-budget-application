const transactionsService = require('../services/transactions.services');

module.exports = {
    addTransaction: async (req, res) => {
        try {
            let date = req.body.date ? new Date(req.body.date) : Date.now()
            const params = {
                ...req.body,
                created_at: date,
                user_id: req.users?.user_id
            }
            const transactions = await transactionsService.create(params)
            await transactions.save();
            return res.status(200).json({
                message: `Transactions Berhasil Ditambahkan`,
                status: 'success',
            })
        } catch (error) {
           return res.status(500).json({
                message: error
            })
        }
    },
    getTransaction: async (req, res) => {
        try {
            const params = {
                ...req.users
            }
            const _data = await transactionsService.get(params)
            return res.status(200).send({
                result: _data
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    deleteTransactionByID: async (req, res) => {
        try {
            const filter = {
                _id: {
                    $in: req.body.id
                }
            }
            await transactionsService.delete(filter)
            return res.status(200).send({
                message: "Transaction deleted successfully.",
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    updateTransaction: async (req, res) => {
        try {
            const params = {
                filter: {
                    _id: req.body.id
                },
                data: {
                    ...req.body
                }
            }
            const user = await transactionsService.update(params)
            return res.status(200).send({
                message: "Transaction updated successfully.",
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    }
}