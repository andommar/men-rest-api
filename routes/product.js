const router = require("express").Router();
const product = require("../models/product");
const { verifyToken } = require("../validation");



// CRUD operations


// /api/products "/" the slash is the one we're putting below
//Create product -- post
router.post("/", verifyToken, (req, res) => {
    data = req.body;


    product.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});


// /api/products "/" the slash is the one we're putting below
//Read all products -- get

router.get("/", (req, res) => {
    product.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});

//Read specific product inStock-- get
router.get("/instock", (req, res) => {
    product.find({inStock: true})
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});


//Read specific product -- get
router.get("/:id", (req, res) => {
    product.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});



//Update specific product -- put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    product.findByIdAndUpdate(id,req.body) // body of the post
    .then(data => {
        if(!data)
        {
            res.status(404).send({message: "Cannot update product id =" + id + "Product was not found"})
        }
        else
        {
            res.send({ message: "Product was succesfully updated"})
        }
    })
    .catch(err => { res.status(500).send({message: "Error product with id="+ id})})
});



// Delete specific product -- delete

router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    product.findByIdAndDelete(id)
    .then(data => {
        if(!data)
        {
            res.status(404).send({message: "Cannot update product id =" + id + "Product was not found"})
        }
        else
        {
            res.send({ message: "Product was succesfully updated"})
        }
    })
    .catch(err => { res.status(500).send({message: "Error product with id="+ id})})
});




module.exports = router;