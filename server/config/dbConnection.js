const mongoose = require("mongoose");

exports.dbConnect = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to DB !"));
};
