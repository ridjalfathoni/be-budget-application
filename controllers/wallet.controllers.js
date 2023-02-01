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
            return res.status(200).json({
                message: 'Wallet berhasil dibuat.',
                status: 'success',
            })
        } catch (error) {
             
            return res.status(500).json({
                message: error
            })
        }
    },
    getListWallet: async (req,res) => {
        try {
            const _data = await walletService.get(req.users);

            return res.status(200).json({
                result: _data
            })
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: "error"
            })
        }
    },
    deleteWalletByID: async(req,res) => {
        try {
            const params = {
                _id: {
                    $in: req.body.id
                }
            }
            await walletService.delete(params);

            return res.status(200).send({
                message: "Wallet berhasil dihapus."
            })
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: "error"
            })   
        }
    },
    updateWalletByID: async(req,res) => {
        try {
            const params = {
                filter: {
                    _id: req.body.id
                },
                data: {
                    ...req.body
                }
            }
            const _data = await walletService.update(params);
            return res.status(200).json({
                message: "Wallet berhasil diupdate.",
                data: _data,
                status: "success"
            })
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: "error"
            })
        }
    }
}