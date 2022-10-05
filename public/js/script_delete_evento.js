// Delete evento 
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
        location.reload()
        
    }).catch(err => {
        console.log(err);
    });
}