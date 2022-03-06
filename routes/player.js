const router = require("express").Router();
const player = require("../models/player");
const {verifyToken} = require("../validation");

//CRUD operations

//Create player -- post
router.post("/", verifyToken, (req, res) => {
    data = req.body;

    player.insertMany(data)
    .then(data => { res.send(data);})
    .catch(err => {res.status(500).send({message: err.message})})
});

//Get all players
router.get("/", (req, res) => {
    player.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})

});

//Read specific player -- get

router.get("/team/:team", (req, res) => {
    player.find({team: req.params.team})
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});

//Read specific player id --get
router.get("/:id", (req, res) => {
    player.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});

//Update specific player -- put
router.put("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    player.findByIdAndUpdate(id,req.body) // body of the post
    .then(data => {
        if(!data)
        {
            res.status(404).send({message: "Cannot update player id =" + id + "player was not found"})
        }
        else
        {
            res.send({ message: "player was succesfully updated"})
        }
    })
    .catch(err => { res.status(500).send({message: "Error player with id="+ id})})
});


// Delete specific player -- delete

router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    player.findByIdAndDelete(id)
    .then(data => {
        if(!data)
        {
            res.status(404).send({message: "Cannot update player id =" + id + "player was not found"})
        }
        else
        {
            res.send({ message: "player was succesfully deleted"})
        }
    })
    .catch(err => { res.status(500).send({message: "Error player with id="+ id})})
});







module.exports = router;
