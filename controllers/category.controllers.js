const categoryService = require('../services/category.services');

module.exports = {
    addCategory: async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({
                    message: "Icon tidak boleh kosong"
                })
            }
            const params = {
                ...req.body,
                icon: file,
                user_id: req.users?.user_id
            }
            const category = await categoryService.create(params);
            
            await category.save();
            return res.status(200).json({
                message: 'Category berhasil ditambahkan.',
                status: 'success',
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const params = {
                ...req.users
            }
            const _data = await categoryService.get(params);
            return res.status(200).send({
                result: _data
            })
        } catch (error) {
            return res.status(500).json({
                message:error
            })
        }
    },
    deleteCategoryByID: async(req,res) => {
        try {
            const params = {
                _id: {
                    $in: req.body.id
                }
            }
            await categoryService.delete(params);
            return res.status(200).send({
                message: "Category berhasil dihapus",
                status: "success"
            })
        } catch (error) {
            return res.status(500).json({
                message: error,
                status: "error"
            })
        }
    },
    updateCategory: async(req,res) => {
        try {
            const file = req.file;
            const params = {
                filter: {
                    _id: req.body.id
                },
                data: {
                    ...req.body,
                    icon: file,
                }
            }
            const category = await categoryService.update(params)
            return res.status(200).send({
                message: "Category berhasil diupdate.",
                data: category,
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