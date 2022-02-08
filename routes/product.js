const express = require("express");
const router = express.Router();
const Products = require("../models/Products");

// Route: 1 Fetch all products "/api/product/allProducts" - { No login required }
router.get('/allProducts', async (req, res) => {
   try {
      const products = await Products.find().select("-_id  -skus -date");
      res.json(products);
   } catch (error) {
      res.status(500).send("Server Error in fetching all products");
   }
})

module.exports = router  ;

