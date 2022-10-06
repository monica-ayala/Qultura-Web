// Delete event in main page
function deleteEvento(element){
    element.click()
    let id_evento = element.id;
    let cards = document.getElementById("cardsevents")
    let ruta = 'evento/borrar/evento/' + id_evento;

    // Data to send as json
    let data = {
        id_evento : id_evento
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Después de borrar un evento este no se podrá recuperar, su información se perderá igualmente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            // Asynchronous post
            fetch(ruta, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response => {
                location.reload()
                
            }).catch(err => {
                console.log(err);
            });
          Swal.fire(
            '¡Eliminado!',
            'El evento se eliminó exitosamente',
            'success'
          )
        }
      })
}