const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB connected suncccessfully"))
    .catch((error) => {
        console.log("DB Connection issues");
        console.error(error);
        process.exit(1);
    });
};