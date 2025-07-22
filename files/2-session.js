const savedMessageP = document.getElementById('savedMessage');

// Función para guardar el mensaje
function saveMessage() {
    const message = document.getElementById('tempMessage').value;
    sessionStorage.setItem('temporalMessage', message);
    loadMessage(); // Actualiza lo que se ve en pantalla
}

// Función para borrar el mensaje
function deleteMessage() {
    sessionStorage.removeItem('temporalMessage');
    loadMessage(); // Actualiza lo que se ve en pantalla
}

// Función para cargar y mostrar el mensaje
function loadMessage() {
    const message = sessionStorage.getItem('temporalMessage');
    savedMessageP.textContent = message ? message : 'No hay nada guardado.';
}

// Cargar el mensaje guardado al abrir la página
loadMessage();