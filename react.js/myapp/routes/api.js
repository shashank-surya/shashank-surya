var express = require("express");
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/images' })
const path = require("path")
const UserController = require("../app/controller/UserController");
const CategoryController = require("../app/controller/CategoryController");
const BrandController = require("../app/controller/BrandController");
const ProductController = require('../app/controller/ProductController');

//const category=require('../model/category');

router.get("/", (req, res) => {
    res.send("API is running")
})
const imageStorage = multer.diskStorage({
    //Destination to store image
    destination: 'public/images',
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
        //gile.fieldname is name of the field (image)
        //path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000//10000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload an Image'))
        }
        cb(undefined, true)
    }
})

/** User module api */
router.post('/upload', imageUpload.single("image"), function (req, res, next) {
    console.log(req.file.filename)
    res.send(req.file)
})

router.post("/user", UserController.create);
router.get("/user", UserController.get);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.DELETE);

/** Category module api */
router.post("/category", imageUpload.single("image"), CategoryController.create)
//router.post("/category", CategoryController.create);
router.get("/category", CategoryController.get);
router.put("/category/:id", imageUpload.single("image"), CategoryController.update);
router.delete("/category/:id", CategoryController.DELETE);
/**Brand module api */
//router.post("/brand", BrandController.create);

router.post("/brand", imageUpload.single("image"), BrandController.create)
router.get("/brand", BrandController.get);
router.put("/brand/:id", imageUpload.single("image"), BrandController.update);
router.delete("/brand/:id", BrandController.DELETE);
//**product module api */
router.post("/Product", imageUpload.single("image"), ProductController.create)
router.get("/Product", ProductController.get);
router.get("/product-detail/:id", ProductController.getById);
router.get("/ProductByBrand/:brand", ProductController.getByBrand);
router.get("/ProductByCategory/:category", ProductController.getByCategory);
router.put("/Product/:id", imageUpload.single("image"), ProductController.update);
router.delete("/Product/:id", ProductController.DELETE);

module.exports = router;