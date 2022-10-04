const { redirect } = require("express/lib/response");

function deleteUsuario(element){
    let id_user = element.id;
    let ruta = 'borrar/usuario/' + id_user;
    
    let data = {
        id_user : id_user
    }

    fetch(ruta, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        location.reload();
        
    }).catch(err => {
        console.log(err);
    });
}