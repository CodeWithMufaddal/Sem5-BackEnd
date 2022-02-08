const ConnectToMongo = require('./db.js');
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const algoliasearch = require('algoliasearch');

require('dotenv').config({ path: './.env.local' });
const port = process.env.REACT_APP_PORT;

ConnectToMongo()
app.use(cors())
app.use(express.json());

const apiKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);
index.setSettings({
   // Select the attributes you want to search in
   searchableAttributes: ['brand', 'name', 'categories', 'tags'],
   // Define business metrics for ranking and sorting
   customRanking: ['desc(popularity)'],
   // Set up some attributes to filter results on
   attributesForFaceting: ['categories', 'searchable(brand)', 'price', 'tags']
});


app.get("/", (req, res) => { res.send(req.body); })

// ======= auth.js =======
app.use("/api/auth", require("./routes/auth.js"));

// ======= Product.js =======
app.use("/api/Product", require("./routes/product.js"));

// ======= Address.js ======= 
app.use("/api/Address", require("./routes/address.js"));


app.listen(port, () => {
   console.log(`Jamali-Collectio app listening at http://localhost:${port}`);
})


exports.app = functions.https.onRequest(app);
