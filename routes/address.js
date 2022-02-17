const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Address = require("../models/Address");
const fetchUser = require("../middleware/fetchUser");

// Route: 1 Fetch User Address using Get "/api/Address/AllAddress" - { login required }
router.get('/AllAddress', fetchUser, async (req, res) => {
   let success = false;
   // let address =
   // console.log(req.user)
   try {
      let address = await Address.find({ user: req.user.id })
      success = true;
      res.send({ success, address });

   } catch (error) {
      success = false;
      res.status(500).json({
         error: "Server error", message: error.message
      });


   }
})


// Route: 2 Create a New Address using Post "/api/Address/AddNewAddress" - { login required }
router.post('/AddNewAddress', fetchUser, [
   body('Country', "UserName Must be atleast 3 characters long"),
   body('FullName', "UserName Must be atleast 3 characters long"),
   body('MobileNumber').isMobilePhone('en-IN').isLength(10).isInt(),
   body('PinCode').isLength(6).isInt(),
   body('House').not().isEmpty().trim().escape(),
   body('Street').not().isEmpty().trim().escape(),
   body('Landmark').not().isEmpty().trim().escape(),
   body('City').not().isEmpty().trim().escape(),
   body('State').not().isEmpty().trim().escape(),

], async (req, res) => {
   let success = false;

   // Check error by using validationResult
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() })
   }

   const { Country, FullName, MobileNumber, PinCode, House, Street, Landmark, City, State } = req.body;
   try {
      const address = new Address({ user: req.user.id, Country, FullName, MobileNumber, PinCode, House, Street, Landmark, City, State })
      const saveAddress = await address.save();
      success = true;
      res.json({ success, saveAddress });

   } catch (error) {
      success = false;
      res.status(500).json({ success, error, message: error.message, msg: "this massage accurd in address.js " });
   }



})


// Route: 3 Update a User Address Using Put "/api/Address/UpdateAddress" - { login required }
router.put('/UpdateAddress/:id', fetchUser, async (req, res) => {
   let success = false;
   const { Country, FullName, MobileNumber, PinCode, House, Street, Landmark, City, State } = req.body;
   try {
      let newAddress = {}
      if (Country) { newAddress.Country = Country; }
      if (MobileNumber) { newAddress.MobileNumber = MobileNumber; }
      if (FullName) { newAddress.FullName = FullName; }
      if (PinCode) { newAddress.PinCode = PinCode; }
      if (House) { newAddress.House = House; }
      if (Street) { newAddress.Street = Street; }
      if (Landmark) { newAddress.Landmark = Landmark; }
      if (City) { newAddress.City = City; }
      if (State) { newAddress.State = State; }

      // Find the address by id to be update it
      let address = await Address.findById(req.params.id);
      if (!address) { return res.status(404).json({ success, message: "Address Not Found" }); }

      // Check if the user is the owner of the address
      if (address.user.toString() !== req.user.id) { return res.status(401).send("UnAuthorized access!"); }
      // Update the address
      address = await Address.findByIdAndUpdate(req.params.id, { $set: newAddress }, { new: true });
      success = true;
      res.json({ success, address });

   } catch (error) {
      success = false;
      res.status(500).json({ success, error: "Server Error", message: error.message });
   }
})


// Route: 4 Delete user Address Using Delete "/api/Address/DeleteAddress" - { login required }
router.delete('/DeleteAddress/:id', fetchUser, async (req, res) => {
   let success = false;
   try {
      // Find the address by id to be delete it
      let address = await Address.findById(req.params.id);
      if (!address) { return res.status(404).json({ success, message: "Address Not Found" }); }

      // Check if the user is the owner of the address
      if (address.user.toString() !== req.user.id) { return res.status(401).send("UnAuthorized access!"); }
      // Delete the address
      address = await Address.findByIdAndDelete(req.params.id);
      success = true;
      res.json({ success, address });
   } catch (error) {
      success = false;
      res.status(500).json({ success, error: "Server Error", message: error.message });
   }
})



module.exports = router;