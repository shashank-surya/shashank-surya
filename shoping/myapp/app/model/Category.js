const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
     type:String,
     required: false 
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: false
    }
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;