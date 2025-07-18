const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');
const clearAllBtn = document.getElementById('clearAllBtn');
const searchInput = document.getElementById('searchInput');

addNoteBtn.addEventListener('click', addNote);
clearAllBtn.addEventListener('click', clearAllNotes);
searchInput.addEventListener('input', searchNotes);

function addNote() {
const title = noteTitle.value.trim();
const content = noteContent.value.trim();

if (title === "" || content === "") {
alert("Both title and content are required!");
return;
}

const note = {
id: Date.now(),
title,
content
};

saveNote(note);
renderNotes();
noteTitle.value = "";
noteContent.value = "";
}

function saveNote(note) {
const notes = getNotes();
notes.push(note);
localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
return JSON.parse(localStorage.getItem('notes')) || [];
}

function renderNotes(filter = "") {
notesList.innerHTML = "";
const notes = getNotes();

notes
.filter(note => note.title.toLowerCase().includes(filter) || note.content.toLowerCase().includes(filter))
.forEach(note => {
const noteEl = document.createElement('div');
noteEl.classList.add('note');
noteEl.innerHTML = `
<h3>${note.title}</h3>
<p>${note.content}</p>
<div class="note-buttons">
<button onclick="editNote(${note.id})">✎</button>
<button onclick="deleteNote(${note.id})">🗑️</button>
</div>
`;
notesList.appendChild(noteEl);
});
}

function deleteNote(id) {
const notes = getNotes().filter(note => note.id !== id);
localStorage.setItem('notes', JSON.stringify(notes));
renderNotes();
}

function editNote(id) {
const notes = getNotes();
const note = notes.find(note => note.id === id);

const newTitle = prompt("Edit title:", note.title);
const newContent = prompt("Edit content:", note.content);

if (newTitle !== null && newContent !== null) {
note.title = newTitle.trim();
note.content = newContent.trim();
localStorage.setItem('notes', JSON.stringify(notes));
renderNotes();
}
}

function clearAllNotes() {
if (confirm("Delete all notes?")) {
localStorage.removeItem('notes');
renderNotes();
}
}

function searchNotes() {
const filter = searchInput.value.toLowerCase();
renderNotes(filter);
}

window.onload = renderNotes;

