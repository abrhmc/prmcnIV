

### Archivo de Estilos (Común para todos)

Crea este archivo una vez y guárdalo como `estilos.css`. Todos los HTML lo usarán.

#### `estilos.css`
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 20px;
    background-color: #f4f4f4;
}
h1, h2 {
    color: #333;
}
input[type="text"], input[type="password"], textarea {
    display: block;
    width: 300px;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
textarea {
    height: 150px;
    resize: vertical;
}
button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}
button:hover {
    background-color: #0056b3;
}
```

---

### 1. Ejercicio: Validación de Formulario (Súper Sencillo)

Validación básica con `alert` para los mensajes de error.

#### `1-formulario.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>1. Formulario Súper Sencillo</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Formulario de Registro</h1>
    
    <!-- El "return false" evita que la página se recargue al enviar -->
    <form onsubmit="validateForm(); return false;">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username">

        <label for="password">Contraseña:</label>
        <input type="password" id="password">

        <label for="confirmPassword">Confirmar Contraseña:</label>
        <input type="password" id="confirmPassword">

        <button type="submit">Registrarse</button>
    </form>

    <script src="1-formulario.js"></script>
</body>
</html>
```

#### `1-formulario.js`
```javascript
function validateForm() {
    // 1. Obtener los valores de los campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 2. Realizar las validaciones
    if (username === '' || password === '' || confirmPassword === '') {
        alert('Error: Todos los campos son obligatorios.');
        return; // Detiene la función
    }

    if (password.length < 8) {
        alert('Error: La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Error: Las contraseñas no coinciden.');
        return;
    }

    // 3. Si todo está bien, mostrar éxito
    alert('¡Formulario validado correctamente!');
    document.querySelector('form').reset(); // Limpia el formulario
}
```

---

### 2. Ejercicio: sessionStorage (Súper Sencillo)

Guardado y borrado de un dato en la sesión actual de la pestaña.

#### `2-sessionStorage.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>2. sessionStorage Sencillo</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Uso de sessionStorage</h1>
    
    <input type="text" id="tempMessage" placeholder="Escribe un mensaje temporal...">
    <button onclick="saveMessage()">Guardar</button>
    <button onclick="deleteMessage()">Borrar</button>

    <h2>Mensaje Guardado:</h2>
    <p id="savedMessage">...</p>

    <script src="2-session.js"></script>
</body>
</html>
```

#### `2-session.js`
```javascript
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
```

---

### 3. Ejercicio: localStorage (Notas Simples)

Un bloc de notas simple que guarda el texto en `localStorage` para que persista entre sesiones.

#### `3-localStorage.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>3. Notas con localStorage</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Bloc de Notas Persistente</h1>
    <p>Lo que escribas aquí se guardará aunque cierres el navegador.</p>
    
    <textarea id="notesArea" placeholder="Escribe tus notas aquí..."></textarea>
    
    <button onclick="saveNotes()">Guardar Notas</button>
    <button onclick="clearNotes()">Borrar Notas</button>

    <script src="3-local.js"></script>
</body>
</html>
```

#### `3-local.js`
```javascript
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
```

---

### 4. Ejercicio: Cookies (Súper Sencillo)

Recuerda el nombre del usuario usando una cookie.

#### `4-cookies.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>4. Cookies Sencillo</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Gestión de Cookies</h1>

    <!-- Formulario para usuarios nuevos -->
    <div id="welcomeForm">
        <h2>Bienvenido, dinos tu nombre:</h2>
        <input type="text" id="nameInput">
        <button onclick="saveName()">Guardar Nombre</button>
    </div>

    <!-- Saludo para usuarios que regresan -->
    <div id="greeting" style="display: none;">
        <h2 id="greetingMessage"></h2>
        <button onclick="forgetMe()">Olvidarme</button>
    </div>

    <script src="4-cookies.js"></script>
</body>
</html>
```

#### `4-cookies.js`
```javascript
const welcomeForm = document.getElementById('welcomeForm');
const greetingDiv = document.getElementById('greeting');
const greetingMessage = document.getElementById('greetingMessage');

// Función para guardar el nombre en una cookie
function saveName() {
    const userName = document.getElementById('nameInput').value;
    if (userName) {
        // Crea una cookie que expira en 7 días
        document.cookie = `user_name=${userName}; max-age=604800`;
        checkUser(); // Actualiza la vista
    }
}

// Función para "olvidar" al usuario (borrar la cookie)
function forgetMe() {
    // Borra la cookie estableciendo una fecha de expiración pasada
    document.cookie = 'user_name=; max-age=-1';
    checkUser(); // Actualiza la vista
}

// Función para leer el valor de una cookie
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

// Función principal que decide qué mostrar
function checkUser() {
    const userName = getCookie('user_name');
    if (userName) {
        welcomeForm.style.display = 'none';
        greetingDiv.style.display = 'block';
        greetingMessage.textContent = `¡Hola de nuevo, ${userName}!`;
    } else {
        welcomeForm.style.display = 'block';
        greetingDiv.style.display = 'none';
    }
}

// Comprobar si el usuario ya es conocido al cargar la página
checkUser();
```