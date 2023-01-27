const bcrypt = require('bcrypt');

module.exports = (mongoose) => {
    const Users = mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: [true, 'Username tidak boleh kosong']
        },
        password: {
            type: String,
            required: [true, 'Password tidak boleh kosong']
        },
        refreshToken: {
            type: String
        }
    })
    Users.pre('save', function (next) {
        let users = this;

        if (!users.isModified('password' && !users.password)) {

            next();

        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(users.password, salt, function(err, hash) {
                    users.password = hash;
                    next();
                })
            })

        }
    })

    return mongoose.model('Users', Users);
}