const walletService = require('../services/wallet.services');

module.exports = {
    addWallet: async (req, res) => {
        try {
            const params = {
                ...req.body,
                user_id: req.users.user_id
            }
            const wallet = await walletService.create(params)
            await wallet.save();
            res.status(200).json({
                message: 'Wallet berhasil dibuat.',
                status: 'success',
            })
        } catch (error) {
             
            res.status(500).json({
                message: error
            })
        }
    },
    getListWallet: async (req,res) => {
        try {
            const _data = await walletService.get(req.users);

            res.status(200).json({
                result: _data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
                status: "error"
            })
        }
    }
}