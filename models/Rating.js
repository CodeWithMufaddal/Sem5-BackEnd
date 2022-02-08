const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingtSchema = new Schema({
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
   rating: { type: Number, min: 1, max: 5, required: true },
   headLine: { type: String, required: true },
   photos: [],
   comment: String, 
   displayName: { type: String, default: (req) => req.body.displayName },
   date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Rating', RatingtSchema);


