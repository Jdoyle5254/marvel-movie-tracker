const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const  marvelmoviesSchema = new Schema(
    {
title: {
    type: String,
    trim: true,
    required: "Enter a movie title"

},
    
year: {
    type: String,
    required: "Enter release date",
}
  
 })

 const Movie = mongoose.model("Movie", marvelmoviesSchema); 

 module.exports = Movie;

