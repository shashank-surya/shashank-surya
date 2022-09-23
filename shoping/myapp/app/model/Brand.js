const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: false,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: false
    }
})

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
