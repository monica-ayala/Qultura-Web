jQuery(document).ready(function($){
    $("#uploadForm").submit(function() {
        var data = new FormData($('#uploadForm')[0]);
        $.ajax({
            url:'/upload',
            type: 'UPDATE',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
        })
    });
    });

    
function updateMuseo(){
    let museo_id = document.getElementById("id_museo").value;
    let ruta ="/museo/registro/"+ museo_id;
    console.log(museo_id); 


    data = {
        id_museo : museo_id
    }

    fetch(ruta,{
        method: 'UPDATE',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }) .then(response => response.json())
    .catch(err=>{console.log(err)})
}


function editMuseum() {
    // info de un museo
    console.log("entre")
    let nom_museo = document.getElementById("nom_museo")
    let desc_museo = document.getElementById("desc_museo");
    let ubicacion_museo = document.getElementById("ubicacion_museo");
    let link_ubi = document.getElementById("link_ubi");
    let num_museo = document.getElementById("num_museo");
    let imagen_principal = document.getElementById("imagen_principal");
    let imagen_background = document.getElementById("imagen_background");

    //let csrf = document.getElementById("csrf")   -  pide el csrf del doc

    // ruta del post
    let ruta = '/museo/:id_museo';

    //preguntas.innerHTML = ''; render
    //link_ubi : link_ubi.value,
    // data

    data = {
        nombre_museo : nom_museo.value,
        desc_museo : desc_museo.value,
        ubicacion_museo : ubicacion_museo.value,
        
        num_museo : num_museo.value,
        imagen_principal : imagen_principal.value,
        imagen_background : imagen_background.value
      }
    // petición
    console.log(data)
    fetch(ruta, {
        method: 'UPDATE',
        headers: {
            'Content-Type': 'application/json',
            //'csrf-token': csrf  - aquí iría el csrf
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        console.log("hi")
        
    }).catch(err => {
        console.log(err);
    });
}