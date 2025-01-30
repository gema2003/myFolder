const password = document.getElementById('password');
const login = document.getElementById('login');

go = () => {

     if (password.value === '55053' && login.value === 'Invited'){
        document.form.submit(); 
    } else if ((password.value === '') || (login.value === '')) {
         alert("Acceso Denegado");
    } else if (login.value !== 'Invited') {
         alert(`Acceso Denegado "${login.value}" incorrecto`);
    } else if (password.value !== '55053') {
         alert(`Acceso Denegado "${password.value}" incorrecto`);
    } else {
         return false;
    }
};