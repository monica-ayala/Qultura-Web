$(document).ready(function(){
    $('.modal').modal();
  });

function getInfoUser(){

    console.log("holi")

    let modal = document.getElementById("nom_user");
    
    let user_id = document.getElementById("id_user").value;

    let ruta ="/usuario/rol/"+ user_id;

    console.log(modal, user_id);



    fetch(ruta,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        modal.innerHTML+= "<h1>Hola<h1>";
        
    }).catch(err => {
        console.log(err);
    });

}


