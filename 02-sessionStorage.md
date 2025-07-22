### **README para el Ejercicio 2 (sessionStorage)**

# Ejercicio 2: `sessionStorage` (Paso a Paso)

Este documento explica cómo usar `sessionStorage` para guardar información de forma temporal en el navegador, la cual persiste solo mientras la pestaña está abierta.

## 🎯 Objetivo del Ejercicio

*   Crear una interfaz simple con un campo de texto y botones.
*   Guardar el texto del usuario en `sessionStorage` al hacer clic en un botón.
*   Recuperar y mostrar la información guardada al cargar la página.
*   Borrar la información de `sessionStorage`.
*   Entender la naturaleza temporal de `sessionStorage`.

## 📂 Archivos Necesarios

Necesitarás dos archivos en la misma carpeta:

1.  `2-sessionStorage.html` (La estructura de nuestra página)
2.  `2-session.js` (La lógica de almacenamiento)

---

## Paso 1: La Estructura HTML (`2-sessionStorage.html`)

Creamos una interfaz simple para interactuar con la sesión del navegador.

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

### Explicación del Código HTML

*   **`<input type="text" id="tempMessage">`**: Un campo de texto para que el usuario escriba su mensaje. Su `id` nos permitirá leer su contenido desde JavaScript.
*   **`<button onclick="...">`**: A diferencia del primer ejercicio, aquí usamos el evento `onclick` directamente en los botones. Este evento ejecuta la función de JavaScript especificada cuando se hace clic.
*   **`<p id="savedMessage">`**: Un párrafo vacío que usaremos como un "panel de visualización". Su `id` nos permite seleccionarlo y escribir dentro de él el mensaje que recuperemos de `sessionStorage`.

---

## Paso 2: La Lógica de JavaScript (`2-session.js`)

Este código maneja la interacción con la API de `sessionStorage`.

```javascript
// Obtenemos la referencia al párrafo donde mostraremos el mensaje.
const savedMessageP = document.getElementById('savedMessage');

// Función para guardar el mensaje
function saveMessage() {
    const message = document.getElementById('tempMessage').value;
    // Guardamos el mensaje en sessionStorage con una clave llamada 'temporalMessage'
    sessionStorage.setItem('temporalMessage', message);
    loadMessage(); // Actualizamos la vista para mostrar el mensaje recién guardado.
}

// Función para borrar el mensaje
function deleteMessage() {
    // Eliminamos el dato asociado a nuestra clave.
    sessionStorage.removeItem('temporalMessage');
    loadMessage(); // Actualizamos la vista para mostrar que ya no hay nada.
}

// Función para cargar y mostrar el mensaje
function loadMessage() {
    // Leemos el dato de sessionStorage usando la misma clave.
    const message = sessionStorage.getItem('temporalMessage');
    // Si el mensaje existe, lo mostramos. Si no, mostramos un texto por defecto.
    savedMessageP.textContent = message ? message : 'No hay nada guardado.';
}

// Llamamos a esta función una vez al cargar la página para mostrar cualquier
// dato que ya estuviera guardado en la sesión.
loadMessage();
```

### Explicación del Código JavaScript (APIs y Métodos)

*   **`sessionStorage`**:
    *   **API:** Web Storage API. Es un objeto global disponible en el navegador que permite almacenar datos de clave-valor. Su característica principal es que los datos **solo duran lo que dura la sesión de la pestaña**. Si cierras la pestaña, los datos se borran.

*   **`sessionStorage.setItem('clave', 'valor')`**:
    *   **Método:** Guarda un dato en `sessionStorage`. Recibe dos argumentos: la `clave` (un nombre único para identificar tu dato) y el `valor` (la información que quieres guardar). Ambos deben ser texto.

*   **`sessionStorage.getItem('clave')`**:
    *   **Método:** Recupera un dato de `sessionStorage`. Le pasas la `clave` del dato que quieres leer y te devuelve su valor. Si la clave no existe, devuelve `null`.

*   **`sessionStorage.removeItem('clave')`**:
    *   **Método:** Elimina un dato de `sessionStorage` que coincida con la `clave` especificada.

*   **`element.textContent`**:
    *   **Propiedad:** Permite obtener o establecer el contenido de texto de un elemento HTML. La usamos para escribir dinámicamente el mensaje guardado dentro de nuestro párrafo `<p>`.

## 🚀 Cómo Probarlo

1.  Abre `2-sessionStorage.html` en tu navegador.
2.  Escribe un mensaje en el campo de texto y haz clic en "Guardar". Verás tu mensaje en la sección "Mensaje Guardado".
3.  **Recarga la página (con F5)**. El mensaje debería seguir ahí, porque la sesión de la pestaña sigue activa.
4.  **Cierra la pestaña** del navegador por completo.
5.  Vuelve a abrir el archivo `2-sessionStorage.html`. El mensaje habrá desaparecido, demostrando que `sessionStorage` es temporal.
6.  Guarda un nuevo mensaje y luego haz clic en "Borrar". El mensaje desaparecerá.

