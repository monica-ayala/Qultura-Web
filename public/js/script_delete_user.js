
// deleteUsuario
// Funcion que se ejecuta al borrar un usuario
// en donde se pregunta al usuario si desea continuar con la accion

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

// deleteGuia
// Funcion que se ejecuta al borrar un guia
// en donde se pregunta al usuario si desea continuar con la accion

function deleteGuia(element){
    let id_guia = element.id;
    let ruta = '/guias/eliminar_guia/' + id_guia;
    
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
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
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


// deleteLink
// Funcion que se ejecuta al borrar un link
// en donde se pregunta al usuario si desea continuar con la accion

function deleteLink(element){
  let id_link = element.id;
  let ruta = '/links/eliminar_link/' + id_link;
  
  Swal.fire({
      title: '¿Estás seguro?',
      text: "Después de borrar un Link no se podrá recuperar y se perderá su contenido",
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
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          })
          .then(response => {
              location.reload();
              
          }).catch(err => {
              console.log(err);
          });
        Swal.fire(
          '¡Eliminado!',
          'El Link se eliminó exitosamente',
          'success'
        )
      }
    })
}




$(document).ready(function() {
  $('input#input_text, textarea#textarea2').characterCounter();
});
     