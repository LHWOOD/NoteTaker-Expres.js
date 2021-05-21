//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// const router = require("express").router;
// const store = require("./db/db.json");

//sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.json(data);
  });
});

// app.post
app.post("/notes", (req, res) => {
  const newNote = req.body;
  res.json(newNote);
});

//starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
