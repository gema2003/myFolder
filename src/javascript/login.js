// El módulo se ejecuta en su propio alcance para ocultar la "base de datos"
const SecurityModule = (() => {
    // "Base de datos" ficticia privada (no accesible desde la consola)
    const _dbUser = {
        'Invited': '55053',
        'Admin': 'G08032003M'
    };

    // Estado de la sesión privado
    let _authenticated = false;

    // Método privado para validar credenciales
    const _validateCredentials = (user, password) => {
        return _dbUser[user] && _dbUser[user] === password;
    };

    return {
        // Método público para intentar ingresar
        login: () => {
            const loginInput = document.getElementById('login').value.trim();
            const passwordInput = document.getElementById('password').value.trim();

            if (!loginInput || !passwordInput) {
                alert("Acceso Denegado: Campos vacíos");
                return false;
            }

            if (_validateCredentials(loginInput, passwordInput)) {
                _authenticated = true;
                sessionStorage.setItem('sesion_modulo_activa', 'true');
                window.location.replace('src/html/menu.html')
                // document.form.submit();
            } else {
                alert("Acceso Denegado: Usuario o contraseña incorrectos");
                _authenticated = false;
                sessionStorage.removeItem('sesion_modulo_activa');
            }
        },

        // Método público para cuando el usuario sale del módulo
        loguot: () => {
            _authenticated = false;
            sessionStorage.removeItem('sesion_modulo_activa');
            alert("Sesión cerrada. Debe validarse otra vez.");
        },

        // Verificar si tiene permiso de estar aquí (para proteger la carga de la página)
        verificarAcceso: () => {
            if (sessionStorage.getItem('sesion_modulo_activa') !== 'true') {
                alert("No tienes permiso. Inicia sesión.");
                // Aquí puedes redireccionar al login si lo deseas:
                // window.location.href = 'login.html';
            }
        }
    };
})();

// // Tu botón de HTML ahora llamaría a: ModuloSeguridad.ingresar();
document.getElementById('btn-acceso').addEventListener('click', SecurityModule.login);

// // Botton de visibilidad en input password
document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.innerHTML = '<img src="assets/svg/unblock.svg" alt="">'; // Cambia el icono al estar visible
    } else {
        passwordInput.type = 'password';
        this.innerHTML = '<img src="assets/svg/block.svg" alt="">'; // Vuelve al icono original
    }
});





