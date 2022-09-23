const Product = require("../model/Product");
const { default: mongoose } = require("mongoose");
const { constants } = require("buffer");
const fs = require("fs");

const create = async (req, res) => {
    let dataObject = {
        name: req.body.name
    }
    if (req?.body) {
        dataObject['sku'] = req.body.sku
    }
    if (req?.body) {
        dataObject['price'] = req.body.price
    }
    if (req?.body) {
        dataObject['sale_price'] = req.body.sale_price
    }
    if (req?.body?.brand) {
        dataObject['brand'] = req.body.brand
    }
    if (req?.body?.category) {
        dataObject['category'] = req.body.category
    }
    if (req?.file) {
        dataObject['image'] = req.file.filename
    }

    await Product.create(
        dataObject
    ).then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const getByBrand = async (req, res) => {

    await Product.find({
        brand:mongoose.Types.ObjectId(req.params.brand)
    }).populate("brand").populate("category").then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const getById = async (req, res) => {

    await Product.findById(
        mongoose.Types.ObjectId(req.params.id)
    ).populate("brand").populate("category").then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}


const getByCategory = async (req, res) => {

    await Product.find({
        category:mongoose.Types.ObjectId(req.params.category)
    }).populate("brand").populate("category").then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const get = async (req, res) => {

    await Product.find({}).populate("brand").populate("category").then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const update = async (req, res) => {
    await Product.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.id)
        },
        {
            name: req.body.name,
            sku:req.body.sku,
            price:req.body.price,
            sale_prace:req.body.sale_prace,
            brand:req.body.brand,
            category:req.body.category,
            image:req.file.filename
        }
    ).then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}
const DELETE = async (req, res) => {
    Product.findOne(mongoose.Types.ObjectId(req.params.id), (err, doc) => {
        if (err) {
            res.send(err)
        } else {
            var imagePath = "./public/images/" + doc.image;

            fs.stat(imagePath, function (err, stats) {
                if (err) {
                    return console.error(err);
                } else {
                    fs.unlink(imagePath, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
                }
            });
            doc.remove();
            res.send({ message: "Deleted successfully." })

        }
    })
}


module.exports = {
    create,
    get,
    getById,
    getByBrand,
    getByCategory,
    update,
    DELETE,

}         