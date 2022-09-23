const Category = require("../model/Category");
const { default: mongoose } = require("mongoose");
const { constants } = require("buffer");
const fs = require("fs");

const create = async (req, res) => {
    let dataObject = {
        name: req.body.name
    }
    if(req?.file){
        dataObject['image'] = req.file.filename
    }
    if(req?.body?.parent){
        dataObject['parent'] = req.body.parent
    }
    
    await Category.create(
        dataObject
    ).then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const get = async (req, res) => {

    await Category.find({}).populate("parent").then((data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}


const update = async (req, res) => {
    await Category.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.id)
        },
        {
            name: req.body.name,
            image: req.file.filename
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
    Category.findOne(mongoose.Types.ObjectId(req.params.id), (err, doc) => {
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
    update,
    DELETE,

}