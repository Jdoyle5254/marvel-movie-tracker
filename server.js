const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');



var PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require("./routes/api.js"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/moarvelmories", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// this is the function that chooses the port 

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
