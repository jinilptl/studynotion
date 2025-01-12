const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    // valoidateion
    if (!name || !description) {
      return res.status(500).json({
        success: false,
        message: "all fields are required",
      });
    }

    // create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log("categoryDetails is ", categoryDetails);

    // return response

    return res.status(200).json({
      success: true,
      message: "category created succesfully",
    });
  } catch (error) {
    console.log(error.message);
    
    return res.status(500).json({
      success: false,
      message: "error while category making",
    });
  }
};

// getalltags

exports.showAllCategory = async (req, res) => {
  try {
    const allcategory = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "all category returned succesfully",
      allcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// categoryPagedetails

exports.categoryPageDetails = async (req, res) => {
  try {
    const { CategoryId } = req.body;
    //get course fir specified categoryid

    const selectedCategory = await Category.findById(CategoryId)
      .populate("courses")
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "data not found",
      });
    }
    // get course for different category

    const differentCategory = await Category.find({
      _id: { $ne: CategoryId },
    })
      .populate("courses")
      .exec();

    // get top selling courses home work

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
