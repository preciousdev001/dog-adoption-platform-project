const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dog.controller");
const auth = require("../middlewares/auth");

// POST api/dogs
router.post("/", auth, dogController.createDog);

// GET api/dogs
router.get("/", dogController.getAllDogs);

// DELETE route
router.delete("/:id", dogController.deleteDog);

module.exports = router;
