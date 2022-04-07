const router = require("express").Router();
const team = require("../models/team");
const {verifyToken} = require("../validation");

//CRUD operations

//Create team -- post
router.post("/", verifyToken, (req, res) => {
    data = req.body;

    team.insertMany(data)
    .then(data => { res.status(201).send(data);})
    .catch(err => {res.status(500).send({message: err.message})})
});

//Get all teams
router.get("/", (req, res) => {
    team.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})

});

// //Read specific team -- get

// router.get("/:location", (req, res) => {
//     team.findOne({location: req.params.location})
//     .then(data => { res.send(data); })
//     .catch(err => { res.status(500).send({message: err.message})})
// });

//Read specific team id --get
router.get("/:id", (req, res) => {
    team.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send({message: err.message})})
});

//Update specific team -- put
router.put("/:id",verifyToken, (req, res) => {

    const id = req.params.id;

    team.findByIdAndUpdate(id,req.body) // body of the post
    .then(data => {
        if(!data)
        {
            res.status(404).send({message: "Cannot update team id =" + id + "Team was not found"})
        }
        else
        {
            res.send({ message: "Team was succesfully updated"})
        }
    })
    .catch(err => { res.status(500).send({message: "Error team with id="+ id})})
});


// Delete specific team -- delete

router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    team.findByIdAndDelete(id)
    .then(data => {
        if(!data)
        {
            res.status(404).send({message: "Cannot update team id =" + id + "team was not found"})
        }
        else
        {
            res.send({ message: "Team was succesfully deleted"})
        }
    })
    .catch(err => { res.status(500).send({message: "Error team with id="+ id})})
});







module.exports = router;
