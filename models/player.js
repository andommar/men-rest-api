const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let playerSchema = new Schema (
    {
        first_name: {type: String, required: true, min:2, max: 255},
        last_name: {type: String, required: true, min:2, max: 255},
        team: {type: String, required: true, min:3, max: 255},
        position: {type: String, required: true, min:2, max: 20},
        height_cm: {type: Number, required: true}
    }
);

module.exports = mongoose.model("player", playerSchema);
