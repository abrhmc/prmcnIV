const notesArea = document.getElementById('notesArea');

// Función para guardar las notas
function saveNotes() {
    localStorage.setItem('mySavedNotes', notesArea.value);
    alert('¡Notas guardadas!');
}

// Función para borrar las notas
function clearNotes() {
    localStorage.removeItem('mySavedNotes');
    loadNotes(); // Actualiza el textarea
    alert('Notas borradas.');
}

// Función para cargar las notas al iniciar
function loadNotes() {
    const savedNotes = localStorage.getItem('mySavedNotes');
    if (savedNotes) {
        notesArea.value = savedNotes;
    } else {
        notesArea.value = '';
    }
}

// Cargar las notas al abrir la página
loadNotes();