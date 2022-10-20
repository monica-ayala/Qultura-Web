// Delete museum from main page
function deleteMuseum(element){
    element.click()
    let id_museo = element.id;
    let cards = document.getElementById("cards")
    let ruta = '/borrar/' + id_museo;

    // Data to send as JSON
    let data = {
        id_museo : id_museo
    }

    // Validation of delete with swal alert
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Después de borrar un museo este no se podrá recuperar, sus salas y obras también se eliminarán.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            // Asynchronous POST
            fetch(ruta, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response => {
                // Render museum list again
                location.reload()
                
            }).catch(err => {
                console.log(err);
            });
            
          Swal.fire(
            '¡Eliminado!',
            'El museo se eliminó exitosamente',
            'success'
          )
        }
      })

    
}