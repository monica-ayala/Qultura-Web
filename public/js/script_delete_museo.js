function deleteMuseum(element){
    element.click()
    let id_museo = element.id;
    let cards = document.getElementById("cards")
    let ruta = '/borrar/' + id_museo;

    let data = {
        id_museo : id_museo
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(ruta, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response => {
                //render the museum list again
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
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    
}