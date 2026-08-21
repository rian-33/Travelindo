const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

router.get("/destinations", destinationController.getAllDestinations);
router.get("/destinations/:id", destinationController.getDestinationById);
router.get("/culinary", destinationController.getAllCulinary);
module.exports = router;
