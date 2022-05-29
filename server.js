const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//swagger deps
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

//setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

const teamRoutes = require("./routes/team");
const playerRoutes = require("./routes/player");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");


require ("dotenv-flow").config();

//parse request of content type JSON
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE"); //If using .fetch not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-Width, Content-Type, Accept");
    next();
})

mongoose.connect
(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error=>console.log("Error connecting to MongoDB:" +error));

mongoose.connection.once('open', ()=>console.log('Connected successfuly to MongoDB'));


//routes
app.get("/api/welcome", (req, res) => {
    res.status(200).send({message: "Welcome to the MEN RESTful API"});
})


// post, put, delete -> CRUD
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/user", authRoutes);
app.use("/api/news", newsRoutes);


// /api/user/register
// /api/user/login


const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " +PORT);
})

module.exports = app;