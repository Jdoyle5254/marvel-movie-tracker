const mongojs = require("mongojs");
const databaseUrl = "marvelmovies";
const collections = ["movies"];
const db = mongojs(databaseUrl, collections);
const router = require("express").Router();
const Movie = require("../models/marvelmovies.js");


// db.on("error", error => {
//     console.log("Database Error:", error);
//   });
  
  // TODO need to create models file for schema for web deploy
  // const Schema = mongoose.Schema
  // var movies = new Schema({
  // title: String,
  // year: String,
  //  })
  
  // submit route to add the user input to the database
  router.post("/submit", ( req, res) => {
    const movie = {
      title: req.body.title,
      release: req.body.release
    }
  
    movie.watched = false;
  
    db.movies.save(movie, (error, saved) => {
      if (error) {
        console.log(error);
      } else {
        res.send(saved);
      }
    });
  });
  
  // this is the route that calls up the watched movies and displays to the main page.
  router.get("/watched", (req, res) => {
    db.movies.find({ watched: true }, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });
  
  // this is the route that calls up the unwatched movies and displays to the page
  router.get("/unwatched", (req, res) => {
    db.movies.find({ watched: false }, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });
  
  // this is the route that based on the id selected will change the movie to watched
  router.put("/markwatched/:id", ({ params }, res) => {
    db.movies.update(
      {
        _id: mongojs.ObjectId(params.id)
      },
      {
        $set: {
          watched: true
        }
      },
  
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
  
  // this is the route that based on the id selected will change to movie to unwatched
  router.put("/markunwatched/:id", ({ params }, res) => {
    db.movies.update(
      {
        _id: mongojs.ObjectId(params.id)
      },
      {
        $set: {
          watched: false
        }
      },
  
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });

  module.exports = router; 