const mongoose = require('mongoose');
const fs = require('fs');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = {};

db.mongoose = mongoose;

fs.readdirSync(__dirname).filter((file) => 
    file !== 'index.js'
).forEach((result) => {
    var fileName = result.replace('.models.js','');
    db[fileName] = require('./'+result)(mongoose);
})
    
module.exports = db;