const mongoose = require("mongoose")

mongoose
  .connect(
    "mongodb+srv://troopergg:trooper23@cluster0.hxj1ndv.mongodb.net/Gear5?retryWrites=true&w=majority"
  )
  .then((result) => console.log("Database Connected Succesfully"))
  .catch((err) => console.log(err))

// mongoose.connect("mongodb://localhost:27017/amazon")

module.exports = mongoose;
