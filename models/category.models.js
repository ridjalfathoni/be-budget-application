module.exports = (mongoose) => {
    const Category = mongoose.Schema({
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"]
        },
        name: {
            type: String,
            required: [true, "Name kategori tidak boleh kosong."]
        },
        icon: {
            type: String,
            required: [true, "Icon tidak boleh kosong."]
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    })

    return mongoose.model('Category', Category);
}