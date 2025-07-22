### **README para el Ejercicio 4 (Cookies)**

# Ejercicio 4: Cookies (Paso a Paso)

Este documento explica cómo usar cookies para almacenar pequeñas piezas de información, como el nombre de un usuario, y hacer que persistan entre visitas con una fecha de expiración.

## 🎯 Objetivo del Ejercicio

*   Crear una interfaz que muestre un formulario o un saludo dependiendo de si una cookie existe.
*   Escribir una función para crear una cookie con un nombre, valor y fecha de expiración.
*   Escribir una función para leer el valor de una cookie específica.
*   Escribir una función para eliminar una cookie.
*   Entender el manejo de cookies como cadenas de texto.

## 📂 Archivos Necesarios

1.  `4-cookies.html` (La estructura de nuestra página)
2.  `4-cookies.js` (La lógica para manipular cookies)

---

## Paso 1: La Estructura HTML (`4-cookies.html`)

Creamos dos contenedores (`div`) distintos. Solo uno de ellos será visible a la vez, dependiendo de si conocemos al usuario o no.

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

### Explicación del Código HTML

*   **`<div id="welcomeForm">`**: El contenedor que se muestra a los visitantes nuevos.
*   **`<div id="greeting" style="display: none;">`**: El contenedor para usuarios reconocidos. Usamos el atributo `style` para ocultarlo por defecto. JavaScript se encargará de hacerlo visible cuando sea necesario.
*   **`onclick="..."`**: Los botones llaman a las funciones `saveName()` y `forgetMe()` para manejar la lógica de las cookies.

---

## Paso 2: La Lógica de JavaScript (`4-cookies.js`)

Este código es más complejo porque el manejo de cookies es más manual que el de Web Storage.

```javascript
// Referencias a los elementos HTML que vamos a manipular.
const welcomeForm = document.getElementById('welcomeForm');
const greetingDiv = document.getElementById('greeting');
const greetingMessage = document.getElementById('greetingMessage');

// Función para guardar el nombre en una cookie
function saveName() {
    const userName = document.getElementById('nameInput').value;
    if (userName) {
        // Creamos la cookie. max-age está en segundos (7 días = 604800s).
        document.cookie = `user_name=${userName}; max-age=604800`;
        checkUser(); // Actualizamos la vista.
    }
}

// Función para "olvidar" al usuario (borrar la cookie)
function forgetMe() {
    // Para borrar, establecemos una fecha de expiración en el pasado (max-age=-1).
    document.cookie = 'user_name=; max-age=-1';
    checkUser(); // Actualizamos la vista.
}

// Función para leer el valor de una cookie específica
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null; // Devuelve null si no la encuentra.
}

// Función principal que decide qué mostrar
function checkUser() {
    const userName = getCookie('user_name');
    if (userName) {
        // Si la cookie existe, muestra el saludo.
        welcomeForm.style.display = 'none';
        greetingDiv.style.display = 'block';
        greetingMessage.textContent = `¡Hola de nuevo, ${userName}!`;
    } else {
        // Si no, muestra el formulario de bienvenida.
        welcomeForm.style.display = 'block';
        greetingDiv.style.display = 'none';
    }
}

// Comprobamos si el usuario ya es conocido al cargar la página.
checkUser();
```

### Explicación del Código JavaScript (APIs y Métodos)

*   **`document.cookie`**:
    *   **API:** DOM. A diferencia de `localStorage`, `document.cookie` no es un objeto con métodos `setItem`/`getItem`. Es una propiedad de tipo texto que actúa como un "portal" para leer y escribir todas las cookies de la página.
    *   **Para escribir:** Se le asigna un string con un formato específico: `'clave=valor; atributo=valor_atributo'`. El atributo más común es `max-age` para definir la duración de la cookie en segundos.
    *   **Para leer:** Simplemente al acceder a `document.cookie` se obtiene un único string con todas las cookies separadas por `;`. Ej: `"user_name=Ana; theme=dark"`.

*   **`.split('separador')`**:
    *   **Método de String:** Esencial para manejar cookies. Lo usamos dos veces:
        1.  `document.cookie.split('; ')` para dividir el string de cookies en una lista de cookies individuales.
        2.  `cookie.split('=')` para separar cada cookie individual en su clave y su valor.

*   **`element.style.display`**:
    *   **Propiedad:** Permite acceder y modificar las propiedades CSS de un elemento desde JavaScript.
    *   `'block'`: Hace que el elemento sea visible y ocupe su espacio normal.
    *   `'none'`: Oculta completamente el elemento, como si no existiera en la página.

## 🚀 Cómo Probarlo

1.  Abre `4-cookies.html`. Como es la primera vez, verás el formulario pidiendo tu nombre.
2.  Escribe tu nombre y haz clic en "Guardar Nombre". La página cambiará para mostrarte el mensaje de bienvenida.
3.  Cierra la pestaña o el navegador y vuelve a abrir el archivo. Seguirás viendo el mensaje de bienvenida porque la cookie se guardó.
4.  Haz clic en el botón "Olvidarme". El saludo desaparecerá y volverá a mostrarse el formulario inicial.
5.  Si recargas la página ahora, seguirá pidiéndote el nombre, porque la cookie fue eliminada.