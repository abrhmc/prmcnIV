const welcomeForm = document.getElementById('welcomeForm');
const greetingDiv = document.getElementById('greeting');
const greetingMessage = document.getElementById('greetingMessage');

function saveName() {
    const userName = document.getElementById('nameInput').value;
    if (userName) {
        document.cookie = `user_name=${userName}; max-age=604800`;
        checkUser();
    }
}

function forgetMe() {
    document.cookie = 'user_name=; max-age=-1';
    checkUser(); // Actualiza la vista
}

// Función para leer el valor de una cookie
function getCookie(name) {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie === '' || !trimmedCookie.includes('=')) {
            continue;
        }

        const cookieParts = trimmedCookie.split('=');
        const cookieName = cookieParts[0];
        const cookieValue = cookieParts.slice(1).join('=');

        if (cookieName === name) {

            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Si no se encuentra ninguna cookie con el nombre dado
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

checkUser();