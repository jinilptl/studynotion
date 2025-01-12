const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create rating and reviews
exports.createRating = async (req, res) => {
  try {
    //get userid
    const UserId = req.user.id;
    const { rating, review, courseId } = req.body;

    //check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: UserId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "user is not enrolled in this course",
      });
    }
    //check user already review this course

    const alreadyReviewed = await RatingAndReview.findOne({
      user: UserId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "course is already review by the user ",
      });
    }

    //create rating review

    const ratingReviews = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: UserId,
    });

    // update course with this rating

    const updateCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReviews._id,
        },
      },
      { new: true }
    );

    console.log(updateCourseDetails);

    return res.status(200).json({
      success: true,
      message: "rating and review are succesfully",
      ratingReviews,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get avrage rating

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    //calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating avalable

    return res.status(200).json({
      success: true,
      message: "Avarage Rating is 0, no rating given till now ",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAll rating and reviews

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "all reviews fetched succesfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
