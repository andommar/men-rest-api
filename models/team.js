const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let teamSchema = new Schema (
    {
        name: {type: String, required: true, min:4, max: 50},
        full_name: {type: String, required: true, min:4, max: 50},
        location: {type: String, required: true, min:4, max: 255},
        stadium: {type: String, required: true, min:4, max: 255},
        wins: {type: Number, required: true},
        loses: {type: Number, required: true},
        logo: {type: String, required: true, min:4, max: 50}
    }
);

module.exports = mongoose.model("team", teamSchema);
