const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { notes } = require("../../db/db");

// Create a note
function creaateNewNote( body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(path.join(__dirname, "../../db/db.json"), JSON.stringify({ notes: notesArray }, null, 2));
    return note;
};

// Validate if not is empty or wright type
function validateNote(note) {
    if (!note.title || typeof note.title !== "string" ){
        return false;
    }
    if (!note.text || typeof note.text !== "string" ) {
        return false;
    }
    return true;
};

// Get all the notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Create a note
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)){
        res.status(400).send("The note is not properly formatted.");
        return;
    } else {
        const note = creaateNewNote(req.body, notes)
        res.json(note);
    }
    
});



module.exports = router;