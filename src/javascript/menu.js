const TIEMPO_MAXIMO_INACTIVIDAD = 15 * 60 * 1000; // 15 minutos en milisegundos
let _temporizadorInactividad;

// Función central para destruir la sesión y expulsar al usuario
const _expulsarUsuario = (mensaje) => {
    // 1. Destruimos la sesión por completo
    sessionStorage.removeItem('sesion_modulo_activa');
    sessionStorage.removeItem('ultima_actividad_hora');
    sessionStorage.clear(); 

    if (mensaje) alert(mensaje);

    /* 2. 💡 CORRECCIÓN CLAVE: Usamos la raíz limpia '/' para que conecte 
          perfectamente con tu portada en 'serve' sin usar extensiones */
    window.location.replace('../../index.html'); 
};

// RELOJ AUTOMÁTICO: Resetea el tiempo si el usuario está interactuando en el menú
const _reiniciarTemporizador = () => {
    clearTimeout(_temporizadorInactividad);
    
    // Guardamos la estampa de tiempo exacta de su último movimiento
    sessionStorage.setItem('ultima_actividad_hora', Date.now().toString());
    
    // Si se queda quieto 15 minutos, se activa la bomba y lo saca
    _temporizadorInactividad = setTimeout(() => {
        _expulsarUsuario("Tu sesión ha expirado por inactividad.");
    }, TIEMPO_MAXIMO_INACTIVIDAD);
};

// Registramos los sensores: si se mueve, da clic o hace scroll, se resetea el reloj
['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(evento => {
    document.addEventListener(evento, _reiniciarTemporizador);
});

// ========================================================
// 🛡️ EL ESCUDO DE NAVEGACIÓN Y CARGA INTELIGENTE (pageshow)
// ========================================================
window.addEventListener('pageshow', (event) => {
    // 1. Revisamos si la llave de acceso de la sesión sigue viva
    const sesionActiva = sessionStorage.getItem('sesion_modulo_activa') === 'true';
    
    // Leemos a qué hora fue el último movimiento del usuario
    const ultimaActividad = parseInt(sessionStorage.getItem('ultima_actividad_hora'), 10) || 0;
    const tiempoTranscurrido = Date.now() - ultimaActividad;

    // 🛡️ CANDADO ÚNICO: Si el usuario cerró la pestaña, la sesión no existe,
    // o si el tiempo de inactividad de 15 minutos ya expiró... ¡Para afuera!
    if (!sesionActiva || (ultimaActividad > 0 && tiempoTranscurrido > TIEMPO_MAXIMO_INACTIVIDAD)) {
        _expulsarUsuario("Acceso denegado. La sesión expiró o es inválida.");
        return;
    }

    // ✅ ACCESO PERMITIDO: Si la sesión es real y estás logueado legítimamente,
    // el código ignora si usaste la flecha atrás desde Curriculum,
    // te renueva tus 15 minutos de golpe y te revela tu menú futurista limpio.
    _reiniciarTemporizador();
    const menu = document.getElementById('contenido-menu');
    if (menu) {
        menu.style.setProperty('display', 'block', 'important');
    }
});

// ========================================================
// 🚪 BOTÓN DE LOGOUT (Llama a la función centralizada)
// ========================================================
document.getElementById('btn-logout').addEventListener('click', () => {
    _expulsarUsuario("Has cerrado sesión correctamente.");
});


