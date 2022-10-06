const { redirect } = require("express/lib/response");
// Delete user from list
function deleteUsuario(element){
    let id_user = element.id;
    let ruta = 'borrar/usuario/' + id_user;
    
    // Data to send as JSON
    let data = {
        id_user : id_user
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Al borrar un usuario este no tendrá acceso a Qultura Admin hasta obtener una nueva cuenta",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            // Asynchronous call to POST
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
          Swal.fire(
            '¡Eliminado!',
            'El usuario se eliminó exitosamente',
            'success'
          )
        }
      })
}

// Delete guía from list
function deleteGuia(element){
    let id_guia = element.id;
    let ruta = 'eliminar_guia/' + id_guia;
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Después de borrar una guía no se podrá recuperar y se perderá su contenido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínala',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            // Asynchronous call to POST
            fetch(ruta, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(response => {
                location.reload();
                
            }).catch(err => {
                console.log(err);
            });
          Swal.fire(
            '¡Eliminado!',
            'La guía se eliminó exitosamente',
            'success'
          )
        }
      })
}