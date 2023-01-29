module.exports = (mongoose) => {
    const Wallet = mongoose.Schema({
        name: {
            type: String,
            unique: true,
            required: [true, "Nama dompet tidak boleh kosong."],
        },
        balance: {
            type: Number,
            default: 0
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    })

    return mongoose.model('Wallet', Wallet);
}