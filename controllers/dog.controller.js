const Dog = require("../models/dog.model");
const User = require("../models/user.model");

// create new dog rec
// route POST/api/dogs

exports.createDog = async (req, res) => {
  try {
    const { name, description } = req.body;

    //    quick valid.
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Please provide both anem and description" });
    }

    const dog = await Dog.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Dog registered successfully!",
      data: dog,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all docs
// route GET/api/dogs

exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({});

    res.status(200).json({
      success: true,
      count: dogs.length,
      data: dogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
