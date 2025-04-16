const mongoose = require("mongoose");


const dbConnect = () => {
    mongoose.connect('mongodb+srv://surajsingh:suraj123@cluster0.vayvdtv.mongodb.net/blog')
    .then(()=> console.log("DB is Connected"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;