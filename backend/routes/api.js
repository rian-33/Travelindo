const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

// Rute untuk mendapatkan destinasi dari controller
router.get("/destinations", destinationController.getAllDestinations);
// Tambahkan di bawah router.get("/destinations", ...)
router.get("/destinations/:id", destinationController.getDestinationById);
module.exports = router;
