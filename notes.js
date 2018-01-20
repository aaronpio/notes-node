console.log('Starting notes');

const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    };
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes)); 
};


var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title, 
        body
    };

    var duplicateNotes = notes.filter((note) =>  note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    };

};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var currentNotes = fetchNotes();
    var requestedNote = currentNotes.filter((note) => note.title === title);
    return requestedNote[0] ;
};

var removeNote = (title) => {
    debugger;
    var currentNotes = fetchNotes();
    var filteredNotes = currentNotes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return currentNotes.length !== filteredNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};