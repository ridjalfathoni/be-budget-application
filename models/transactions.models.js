module.exports = (mongoose) => {
    const Transactions = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Username tidak boleh kosong']
        },
        amount: {
            type: Number,
            required: [true, 'Amount tidak boleh kosong']
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"]
        },
        category: {
            type: String
        },
        description: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    });
    
    return mongoose.model('Transactions', Transactions);
}