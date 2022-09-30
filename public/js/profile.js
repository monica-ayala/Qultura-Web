let username = document.getElementById("username");
let welcome = document.getElementById("welcome");
let rutaUsuario = '/usuario/loggedin'
fetch(rutaUsuario, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(response => {
    username.innerHTML = response.username + '<i class="material-icons left">account_circle</i>'
    welcome.innerHTML = 'Buenos Días, ' + response.username 
}).catch(err => {
    console.log(err);
});