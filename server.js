let idNumber= 0;
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


//Get Existing Notes pulled from the server or db.json file
app.get('/api/notes', (req, res) => {
  //putting this in the function since putting the dependency as a global variable wouldn't work
  const dataBase = require('./db.json');
  res.send(dataBase);
  // console.log(dataBase);
  res.end();
});

// console.log(id);
// Create and Post New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {
  fs.readFile(__dirname + '/db.json', 'utf8', function (err, notes) {
    if (err) throw err;
    notes = JSON.parse(notes)
    idNumber = idNumber + 1;
    let templateNote = {
      title: req.body.title,
      text: req.body.text,
      id: idNumber
    }

    let newNote = notes.concat(templateNote)
    fs.writeFile(__dirname + "/db.json", JSON.stringify(newNote), (err, notes) => {
      if (err) throw err;
      console.log(newNote)
      res.json(newNote);
      // res.end();

    })
    // console.log(id);
    return idNumber;
  })
})
app.delete('/api/notes/:id', (req, res) => {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId);
  fs.readFile(__dirname + '/db.json', 'utf8', (err, notes) => {
    if (err) throw err;
    notes = JSON.parse(notes);
    notes = notes.filter(val => val.id != noteId)

    fs.writeFile(__dirname + '/db.json', JSON.stringify(notes), (err, data) => {
      if (err) throw err;
      res.json(notes)
    })
  })
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
