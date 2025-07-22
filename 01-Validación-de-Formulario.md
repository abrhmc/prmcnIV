# Ejercicio 1: Validación de Formulario (Paso a Paso)

Este documento explica cómo construir y validar un formulario de registro simple utilizando HTML y JavaScript. El objetivo es asegurar que los datos del usuario sean correctos antes de procesarlos.

## 🎯 Objetivo del Ejercicio

*   Crear un formulario básico con campos para usuario y contraseña.
*   Usar JavaScript para validar los datos cuando el usuario intenta enviar el formulario.
*   Mostrar mensajes de error simples usando `alert()`.
*   Entender cómo conectar el HTML con el JavaScript usando eventos como `onsubmit`.

## 📂 Archivos Necesarios

Necesitarás dos archivos en la misma carpeta:

1.  `1-formulario.html` (La estructura de nuestra página)
2.  `1-formulario.js` (La lógica de validación)

---

## Paso 1: La Estructura HTML (`1-formulario.html`)

Primero, creamos la estructura visual del formulario.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>1. Formulario Súper Sencillo</title>
    <!-- Opcional: Enlace a una hoja de estilos -->
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <h1>Formulario de Registro</h1>
    
    <!-- Aquí empieza nuestro formulario -->
    <form onsubmit="validateForm(); return false;">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username">

        <label for="password">Contraseña:</label>
        <input type="password" id="password">

        <label for="confirmPassword">Confirmar Contraseña:</label>
        <input type="password" id="confirmPassword">

        <button type="submit">Registrarse</button>
    </form>

    <!-- Enlazamos nuestro archivo JavaScript al final -->
    <script src="1-formulario.js"></script>
</body>
</html>
```

### Explicación del Código HTML

*   **`<form>`**: Es el contenedor principal para nuestros campos de entrada.
*   **`<input>`**: Son los campos donde el usuario escribe. A cada uno le damos un `id` único (como un DNI) para poder identificarlo fácilmente desde JavaScript.
*   **`<button type="submit">`**: Este es el botón que, al ser presionado, intenta "enviar" el formulario.
*   **`onsubmit="validateForm(); return false;"`**: Esta es la parte más importante.
    *   `onsubmit`: Es un **evento** que se dispara justo cuando el usuario hace clic en el botón de tipo `submit`.
    *   `validateForm()`: Le decimos al navegador: "Cuando el formulario intente enviarse, ¡ejecuta primero mi función de JavaScript llamada `validateForm`!".
    *   `return false;`: Esto es crucial. Por defecto, un formulario intenta recargar la página al enviarse. `return false;` **cancela ese comportamiento**, dándonos control total con JavaScript.

---

## Paso 2: La Lógica de JavaScript (`1-formulario.js`)

Aquí es donde ocurre la magia de la validación. Creamos la función `validateForm` que mencionamos en el HTML.

```javascript
// Definimos la función que se llamará desde el HTML
function validateForm() {
    
    // --- 1. Obtener los datos del usuario ---
    // Usamos document.getElementById() para encontrar los elementos por su ID.
    // Usamos .value para obtener el texto que el usuario escribió dentro de ellos.
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // --- 2. Realizar las validaciones con condicionales 'if' ---

    // Regla 1: ¿Algún campo está vacío?
    if (username === '' || password === '' || confirmPassword === '') {
        alert('Error: Todos los campos son obligatorios.');
        return; // 'return' detiene la ejecución de la función aquí.
    }

    // Regla 2: ¿La contraseña es muy corta?
    // .length nos da el número de caracteres de un texto.
    if (password.length < 8) {
        alert('Error: La contraseña debe tener al menos 8 caracteres.');
        return; // Detenemos la función para no mostrar más alertas.
    }

    // Regla 3: ¿Las contraseñas no coinciden?
    if (password !== confirmPassword) {
        alert('Error: Las contraseñas no coinciden.');
        return;
    }

    // --- 3. Si todo está bien, mostrar mensaje de éxito ---
    // Si el código llega hasta aquí, significa que ninguna de las validaciones anteriores falló.
    alert('¡Formulario validado correctamente! Enviando datos...');
    
    // Opcional: Limpiar el formulario después de un envío exitoso.
    document.querySelector('form').reset();
}
```

### Explicación del Código JavaScript (APIs y Métodos)

*   **`function validateForm() { ... }`**:
    Define un bloque de código reutilizable. Es nuestra "receta" de validación.

*   **`document.getElementById('id_del_elemento')`**:
    *   **API:** DOM (Document Object Model). El `document` representa toda la página HTML.
    *   **Método:** `getElementById()`. Es una función que busca en todo el `document` un elemento que tenga el `id` que le pasamos entre paréntesis. Es la forma más rápida y común de seleccionar un elemento único.

*   **`.value`**:
    *   **Propiedad:** Es una característica de los elementos de formulario (`<input>`, `<textarea>`, etc.). Nos da el contenido actual que el usuario ha escrito en ese campo.

*   **`if (condición) { ... }`**:
    *   **Concepto:** Es una estructura de control básica en programación. Permite ejecutar un bloque de código solo **si** la `condición` entre paréntesis es verdadera. La usamos para comprobar nuestras reglas de validación.

*   **`.length`**:
    *   **Propiedad:** Es una propiedad de los strings (cadenas de texto). Devuelve el número de caracteres que contiene el texto. `password.length` nos dice cuántos caracteres tiene la contraseña.

*   **`alert('mensaje')`**:
    *   **API:** Window.
    *   **Método:** `alert()`. Muestra una pequeña ventana emergente en el navegador con el mensaje que le pasemos. Es útil para notificaciones rápidas y sencillas.

*   **`return;`**:
    *   **Concepto:** Es una palabra clave que detiene inmediatamente la ejecución de una función. La usamos dentro de nuestros `if` para que, tan pronto como se encuentre un error, la función pare y no siga comprobando las demás reglas.

*   **`document.querySelector('form').reset()`**:
    *   **Desglose de la línea**: Esta línea realiza dos acciones en una.
        1.  **`document.querySelector('form')`**:
            *   **API:** DOM (Document Object Model).
            *   **Método:** `querySelector()`. Este es otro método para encontrar elementos en el HTML. A diferencia de `getElementById`, que busca por un ID específico, `querySelector` encuentra el **primer** elemento que coincida con el selector de CSS que le pasemos. En este caso, `'form'` encuentra la primera etiqueta `<form>` que haya en la página.
        2.  **`.reset()`**:
            *   **Método:** Este es un método especial que solo tienen los elementos de formulario (`<form>`).
            *   **Acción:** Al llamarlo, borra el contenido de todos los campos de entrada (`input`, `textarea`, etc.) que están dentro de ese formulario, devolviéndolos a su estado inicial. Es el equivalente a hacer clic en un botón de tipo "reset".
    *   **En resumen**: La línea completa se puede leer como una instrucción: "Busca el formulario en la página y luego límpialo". Lo hacemos para que, después de un envío exitoso, el usuario vea los campos vacíos.

## 🚀 Cómo Probarlo

1.  Abre el archivo `1-formulario.html` en tu navegador web.
2.  Intenta hacer clic en "Registrarse" con los campos vacíos. Debería aparecer la primera alerta.
3.  Escribe una contraseña de menos de 8 caracteres. Debería aparecer la segunda alerta.
4.  Escribe dos contraseñas diferentes. Debería aparecer la tercera alerta.
5.  Completa todo correctamente. Debería aparecer el mensaje de éxito y el formulario se limpiará solo.