const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dog.controller");

// POST api/dogs
router.post("/", dogController.createDog);

// GET api/dogs
router.get("/", dogController.getAllDogs);

module.exports = router;
