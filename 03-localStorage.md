### **README para el Ejercicio 3 (localStorage)**

# Ejercicio 3: `localStorage` (Bloc de Notas)

Este ejercicio demuestra cómo usar `localStorage` para crear un bloc de notas simple cuyos datos persisten incluso después de cerrar y reabrir el navegador.

## 🎯 Objetivo del Ejercicio

*   Crear una interfaz con un área de texto (`textarea`) para escribir notas.
*   Guardar el contenido del `textarea` en `localStorage`.
*   Cargar las notas guardadas automáticamente al abrir la página.
*   Entender la diferencia clave entre `localStorage` (persistente) y `sessionStorage` (temporal).

## 📂 Archivos Necesarios

1.  `3-localStorage.html` (La estructura de nuestra página)
2.  `3-local.js` (La lógica de almacenamiento persistente)

---

## Paso 1: La Estructura HTML (`3-localStorage.html`)

La interfaz es muy sencilla: un área grande para escribir y dos botones de acción.

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

### Explicación del Código HTML

*   **`<textarea id="notesArea">`**: Similar a un `<input>`, pero diseñado para múltiples líneas de texto. Es perfecto para un bloc de notas. Su `id` nos permite acceder a su contenido.
*   **`<button onclick="...">`**: Al igual que en el ejercicio anterior, usamos el evento `onclick` para llamar directamente a nuestras funciones de JavaScript (`saveNotes` y `clearNotes`).

---

## Paso 2: La Lógica de JavaScript (`3-local.js`)

Este código interactúa con `localStorage` para guardar y cargar las notas.

```javascript
// Obtenemos la referencia al textarea.
const notesArea = document.getElementById('notesArea');

// Función para guardar las notas
function saveNotes() {
    // Guardamos el contenido del textarea en localStorage con una clave.
    localStorage.setItem('mySavedNotes', notesArea.value);
    alert('¡Notas guardadas!');
}

// Función para borrar las notas
function clearNotes() {
    // Eliminamos el dato de localStorage.
    localStorage.removeItem('mySavedNotes');
    loadNotes(); // Actualizamos el textarea para que se vacíe.
    alert('Notas borradas.');
}

// Función para cargar las notas guardadas
function loadNotes() {
    // Leemos las notas desde localStorage.
    const savedNotes = localStorage.getItem('mySavedNotes');
    // Si existen notas guardadas, las ponemos en el textarea.
    if (savedNotes) {
        notesArea.value = savedNotes;
    } else {
        notesArea.value = '';
    }
}

// Llamamos a esta función al cargar la página para que las notas
// aparezcan automáticamente si ya existían.
loadNotes();
```

### Explicación del Código JavaScript (APIs y Métodos)

*   **`localStorage`**:
    *   **API:** Web Storage API. Es un objeto global casi idéntico a `sessionStorage`, con una diferencia fundamental: los datos guardados en `localStorage` **no tienen fecha de expiración**. Permanecen almacenados en el navegador del usuario indefinidamente, hasta que se borran manualmente a través del código (`removeItem`) o el usuario borra los datos de su navegador.

*   **`localStorage.setItem('clave', 'valor')`**:
    *   **Método:** Guarda un dato de forma persistente. Funciona igual que su contraparte de `sessionStorage`.

*   **`localStorage.getItem('clave')`**:
    *   **Método:** Recupera un dato persistente. Funciona igual que su contraparte de `sessionStorage`.

*   **`localStorage.removeItem('clave')`**:
    *   **Método:** Elimina un dato persistente. Funciona igual que su contraparte de `sessionStorage`.

*   **`if (savedNotes)`**:
    *   **Concepto:** Esta es una forma corta de comprobar si `savedNotes` no es nulo o indefinido. `localStorage.getItem` devuelve `null` si no encuentra la clave. En JavaScript, `null` se evalúa como `false` en un contexto booleano, por lo que el código dentro del `if` solo se ejecuta si se encontró algo.

## 🚀 Cómo Probarlo

1.  Abre `3-localStorage.html` en tu navegador.
2.  Escribe algunas notas en el área de texto y haz clic en "Guardar Notas".
3.  Recarga la página. Las notas seguirán ahí.
4.  **Cierra completamente el navegador (no solo la pestaña).**
5.  Vuelve a abrir el navegador y el archivo `3-localStorage.html`. Las notas **seguirán ahí**, demostrando la persistencia de `localStorage`.
6.  Haz clic en "Borrar Notas". Las notas desaparecerán y no volverán aunque recargues la página.

---
