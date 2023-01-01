const mongoose = require("mongoose");

exports.connectDB = async (URI) => {
  try {
    await mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Connected To Database");
      }
    );
  } catch (error) {
    console.log(new Error("Database Error", error));
  }
};
