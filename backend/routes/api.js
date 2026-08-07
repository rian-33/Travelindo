const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

// Rute untuk mendapatkan destinasi dari controller
router.get("/destinations", destinationController.getAllDestinations);

module.exports = router;
