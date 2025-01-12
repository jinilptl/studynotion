const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB KA CONECTION SUCCESFULLY ");
    })
    .catch((error) => {
      console.log("db connection error  ");
      console.log(error);
      process.exit(1);
    });
};
