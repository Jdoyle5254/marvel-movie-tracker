const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");

const databaseUrl = "warmup";
const collections = ["movies"];
const db = mongojs(databaseUrl, collections);

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

db.on("error", error => {
  console.log("Database Error:", error);
});

app.post("/submit", ({ body }, res) => {
  const movie = body;

  movie.watched = false;

  db.movies.save(movie, (error, saved) => {
    if (error) {
      console.log(error);
    } else {
      res.send(saved);
    }
  });
});

app.get("/watched", (req, res) => {
  db.movies.find({ watched: true }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/unwatched", (req, res) => {
  db.movies.find({ watched: false }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.put("/markwatched/:id", ({ params }, res) => {
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

app.put("/markunwatched/:id", ({ params }, res) => {
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

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
