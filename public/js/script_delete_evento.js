function deleteEvento(element){
    element.click()
    let id_evento = element.id;
    let cards = document.getElementById("cardsevents")
    let ruta = 'evento/borrar/evento/' + id_evento;

    let data = {
        id_evento : id_evento
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
        //render the museum list again
        cards.innerHTML = ``;;
        for(evento of response.eventos){
                cards.innerHTML += `<li class="card-panel card-pers hoverable" style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/uploads/${evento.multimedia_evento}') no-repeat; background-size: cover;"> <div><a onclick="deleteEvento(this)" id="${evento.id_evento}" class="btn-floating red card-link" style="float:right;margin:0px"> <i class="material-icons">delete</i> </a> <h3 class="card-title white-text">${evento.info_evento}</h3> <div class="card-content white-text"> <p> Fecha: ${evento.fecha_hora_evento}</p> </div></div></li>`;          
        }
        
    }).catch(err => {
        console.log(err);
    });
}