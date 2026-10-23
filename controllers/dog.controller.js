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
    // adding query param with defaults
    const { status, page = 1, limit = 5 } = req.query;

    // build dynamic filter
    const filter = {};
    if (status) {
      filter.status = status; //ex. availablle or adopted status based on the filter they choose
    }

    //calc pagination skip val
    const skip = (parseInt(page) - 1) * parseInt(limit);

    //add query options to the db
    const dogs = await Dog.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    //count total docs matching filter for metadata
    const totalDogs = await Dog.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: dogs.length,
      total: totalDogs,
      totalPages: Math.ceil(totalDogs / limit),
      currentPage: parseInt(page),
      data: dogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    const dogId = req.params.id;

    //find and delete dog by ID
    const deletedDog = await Dog.findByIdAndDelete(dogId);

    //edge case: if dog doesn't exist
    if (!deletedDog) {
      return res.status(404).json({
        success: false,
        error: `Dog with id ${dogId} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Dog successfully removed from platform",
      data: deletedDog,
    });
  } catch (error) {
    // invalid mongoDB object format
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, error: "Invalid dog ID format" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
