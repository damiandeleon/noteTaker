// Set up Dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));










// Routes/

// Basic route that sends the user first to index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//html route to return the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// get /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    // res.json('db.json')
  fs.readFile(path.join(__dirname, '/db.json'), 'utf8', (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));

      ///use this data and post it to notes.
  })
});

// Create New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {
  // const notes = []
  const newNote = req.body;
  // console.log(newNote);
  newNote.noteTitle = newNote.title.replace(/\s+/g, '').toLowerCase();
  newNote.noteText = newNote.text.replace(/\s+/g, '').toLowerCase();
  // notes.push(newNote);
  console.log(notes);
  res.json(newNote);
  fs.appendFile('./db.json', JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
});

//Delete Notes
app.delete('/api/notes', (err => {
  if(err) throw err;
}))

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

