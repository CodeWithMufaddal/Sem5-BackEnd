const mongoose = require('mongoose');
const { Schema } = mongoose;
const AddressSchema = new Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
   Country: { type: String, required: true },
   FullName: { type: String, required: true },
   MobileNumber: { type: String, required: true },
   PinCode: { type: Number, required: true, capped: { size: 6 } },  // 6 digit     
   House: { type: String, required: true },
   Street: { type: String, required: true },
   Landmark: String,
   City: { type: String, required: true },
   State: { type: String, required: true },
   Default: { type: Boolean, default: false },
   date: { type: Date, default: Date }

})


module.exports = mongoose.model('Address', AddressSchema);