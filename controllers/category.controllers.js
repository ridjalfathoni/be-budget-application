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
    }
}