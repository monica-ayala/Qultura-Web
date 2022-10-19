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
                cards.innerHTML = ``;;
                console.log(response.museos)
                for(museo of response.museos){
                    if(museo.status == 1){
                        cards.innerHTML += `<li class="card-panel card-pers hoverable" style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/uploads/${museo.imgP_museo}') no-repeat; background-size: cover;"> <div><a class="btn-floating green card-link" style="float:right;margin:0px;margin-left:10px"> <i class="material-icons">edit</i> </a><a onclick="deleteMuseum(this)" id="${museo.id_museo}" class="btn-floating red card-link" style="float:right;margin:0px"> <i class="material-icons">delete</i> </a> <h3 class="card-title white-text">${museo.nom_museo}</h3> <div class="card-content white-text"> <p> Tel: ${museo.num_museo}</p> <p> ${museo.desc_museo.substring(0, 100)} . . .</p></div></div></li>`;
                    }
                }
                
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