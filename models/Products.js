const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
   brand: { type: String, defult: "Jamali-Collection" },
   name: { type: String, required: true },
   category: { type: String, required: true },
   skus: [{type: Object,required: true,}],
   tags: { type: Array, default: ["relevent"], },
   date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Products', ProductSchema);