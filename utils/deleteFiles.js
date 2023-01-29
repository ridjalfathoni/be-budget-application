const fs = require('fs');
module.exports = {
    async deleteFiles(path) {
        try {
            return await fs.unlinkSync(path);
        } catch (error) {
            throw new Error({
                message: "gagal menghapus file",
                status: "error"
            })
        }
    }
}