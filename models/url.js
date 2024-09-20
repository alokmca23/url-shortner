const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID : {
        type : String,
        required : true,
        unique : true,
    },
    redirectURL : {
        type : String,
        required : true,
    },
    visitHistory : [{
        timestamp : {
            type : Number
        },
    }],
    generatedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
    }
},{timestamp : true},);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;