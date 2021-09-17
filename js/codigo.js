const password = document.getElementById('password');
const login = document.getElementById('login');

go = () => {

if (password.value === '55053' && login.value === 'Invited'){ 
        document.form.submit(); 
    } 
    else{ 
         alert("Access denied"); 
    } 
};