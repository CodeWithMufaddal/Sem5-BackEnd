
const fetch = require('node-fetch');


const fetchProducts = async () => {
   return (await fetch('http://localhost:5500/api/Product/allProducts', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   })).json()
}

module.exports = fetchProducts;