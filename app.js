//Notes Node

console.log('starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    title: 'title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    title: 'body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add','Add a new note', {
        title: titleOptions,
        body: bodyOptions
        }
    )

    .command('list','List all notes')

    .command('read','read a note', {
        title: titleOptions,
        }
    )

    .command('remove','remove a note', {
        title: titleOptions, 
        }
    )

    .help()
    .argv;

var command = argv._[0];
console.log('Command: ', command);
console.log('yargs', argv)

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    
    if (note === undefined) {
        console.log('You entered a duplicate note, numbskull');
    } else {
        console.log(`You submitted a note titled: ${argv.title} with the content: ${argv.body}`);
    };

} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => {
        console.log(`Here's one: ${note.title} - ${note.body}`);
        
    });

} else if (command === 'read') {
    var requestedNote = notes.getNote(argv.title);
    var message = requestedNote ? `Here you go: ${argv.title} - ${argv.body}` : 'That note doesn\'t exist silly';
    console.log(message);

} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note removed boi' : 'No note found, dummy';
    console.log(message);

} else {
    console.log('Command not recognized');
};

