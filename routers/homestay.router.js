const express = require("express");
const router = express.Router();
const homeStayController = require("../controllers/homeStay.controllers"); 
const { authJwt } = require("../middleware");

// Create a home stay
// POST http://localhost:500/api/v1/homestay
router.post("/", [authJwt.verifytoken, authJwt.isModOrAdmin], homeStayController.create);

// Get all home stays
router.get("/", homeStayController.getAll);

// Get a home stay by ID
router.get("/:id", [authJwt.verifytoken], homeStayController.getByid);

// Update a home stay
router.put(
    "/:id",
    [authJwt.verifytoken, authJwt.isModOrAdmin],
    homeStayController.update
);

// Delete a home stay
router.delete(
    "/:id",
    [authJwt.verifytoken, authJwt.isAdmin],
    homeStayController.delete
);

module.exports = router;
