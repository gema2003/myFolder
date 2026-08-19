// 🛡️ Escudo de control para Curriculum, Folder y About Me
window.addEventListener('pageshow', () => {
    const sesionActiva = sessionStorage.getItem('sesion_modulo_activa') === 'true';

    // Si el usuario ya cerró sesión o el tiempo expiró, ¡No lo dejamos ver nada!
    if (!sesionActiva) {
        sessionStorage.clear();
        alert("Acceso denegado. Tu sesión expiró o es inválida.");
        
        // Lo saca volando directo a tu pantalla de inicio limpia
        window.location.replace('../../index.html'); 
    }
});
