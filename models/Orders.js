const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
   brand: { type: String, defult: "Jamali-Collection" },
   name: { type: String, required: true },
   category: { type: String, required: true },
   skus: { type: Array, required: true },
   tags: { type: Array, default: ["relevent"], },
   date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Orders', OrderSchema);