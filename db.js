const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.local', });
const mongoURI = process.env.REACT_APP_MONGODBURI



const ConnectToMongo = async () => {
   await mongoose.connect(mongoURI)
   console.log("Connected to MongoDB")  
}

module.exports = ConnectToMongo