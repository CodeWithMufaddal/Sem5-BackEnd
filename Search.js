
require('dotenv').config({ path: './BackEnd/.env.local', });
const algoliasearch = require('algoliasearch');
const fetch = require('node-fetch');

const apiKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);

const Search = async (req, res, next) => {
   const fetchDataFromDatabase = async () => {
      return (await fetch('http://localhost:5500/api/Product/allProducts', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })).json()
   }

   const records = await fetchDataFromDatabase();

   index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
}

module.exports = Search
