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