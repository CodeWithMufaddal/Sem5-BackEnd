const mongoose = require('mongoose');
const { Schema } = mongoose;
const AddressSchema = new Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
   country: { type: String, required: true },
   fullName: { type: String, required: true },
   MobileNumber: { type: String, required: true },
   PinCode: { type: Number, required: true },  // 6 digit     
   house: { type: String, required: true },
   street: { type: String, required: true },
   landmark: String,
   City: { type: String, required: true },
   State: { type: String, required: true },
   default: { type: Boolean, default: false },
   date: { type: Date, default: Date }

})


module.exports = mongoose.model('Address', AddressSchema);