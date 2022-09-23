const { default: mongoose } = require("mongoose");
const User = require("../model/User");

const create = async (req, res) => {
    
    await User.create({ 
        name: req.body.name, 
        age: req.body.age
    }).then( (data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const get = async (req, res) => {
    
    await User.find({}).then( (data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}


const update = async (req, res) => {
   
    await User.updateOne( 
        {
            _id:mongoose.Types.ObjectId(req.params.id)
        },
        { 
            name: req.body.name, 
            age: req.body.age
        }
    ).then( (data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
}

const DELETE= async(req,res) => {
    await User.deleteOne( 
        {
            _id:mongoose.Types.ObjectId(req.params.id)
        }
      
    ).then( (data) => {
        // user create
        res.send(data);
    }).catch(error => {
        // some error
        res.send(error)
    })
    }
    

module.exports = {
    create,
    get,
    update,
    DELETE,
}