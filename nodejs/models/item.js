const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//skema dari item
const itemSchema = new Schema({
    suhu_tubuh: {
        type: String,
        required: true,
    },
    tanggal: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', itemSchema);