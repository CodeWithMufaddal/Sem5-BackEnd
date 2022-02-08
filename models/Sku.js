const mongoose = require('mongoose');
const { Schema } = mongoose;
const SkuSchema = new Schema({
   title: { type: String, required: true },
   price: { type: Number, required: true },
   image: [[]],
   size: { type: String, default: "N/A" },
   color: [],
   discription: { required: true },
   date: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Skus', SkuSchema);

