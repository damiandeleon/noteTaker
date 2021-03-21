
//Require Dependencies
console.log("hi");
const express = require('express');
const fs = require('fs');
const path = require('path');


//set up express app

const app = express();
const PORT = 3030;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



//set up Routes

// Basic route that sends the user first to index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//html route to return the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

let idNumber = 1;

function start() {
  //Display the notes from json file
  app.get('/api/notes', function (req, res) {
    fs.readFile(__dirname + '/db/db.json', 'utf8', function (err, data) {
      if (err) throw err;
      console.log("These are the saved notes", data)
      res.json(JSON.parse(data))
    })
  });

  function increment(idNumber) {
    idNumber++;
    return idNumber;
  }

  // console.log(id);
  // Create and Post New Notes - takes in JSON input
  app.post('/api/notes', (req, res) => {

    increment(idNumber);
    fs.readFile(__dirname + '/db/db.json', 'utf8', function (err, notes) {
      if (err) throw err;
      notes = JSON.parse(notes)

      let templateNote = {
        title: req.body.title,
        text: req.body.text,
        id: (idNumber + 1)
      }

      // idNumber = notes.id + 1
      // increment(idNumber);

      let newNote = notes.concat(templateNote)
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(newNote), (err, data) => {
        if (err) throw err;
        console.log(newNote)
        res.json(newNote);
        // res.end();

      })
      // console.log(id);

    })
  })
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId);
    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, notes) => {
      if (err) throw err;
      notes = JSON.parse(notes);
      notes = notes.filter(val => val.id != noteId)

      fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err, data) => {
        if (err) throw err;
        res.json(notes)
      })
    })
  });
}


// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

start();