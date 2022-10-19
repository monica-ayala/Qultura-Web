// Display username
let username = document.getElementById("username");
let rutaUsuario = '/usuario/loggedin'

// Asynchronous get for user account logged in
fetch(rutaUsuario, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(response => {
    username.innerHTML = response.username + '<i class="material-icons left">account_circle</i>'
}).catch(err => {
    console.log(err);
});