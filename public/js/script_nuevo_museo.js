jQuery(document).ready(function($){
    $("#uploadForm").submit(function() {
        var data = new FormData($('#uploadForm')[0]);
        $.ajax({
            url:'/upload',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: data,
        })
    });
    });


// $(document).ready(function() {
//     $("#uploadForm").submit(function() {
//         var data = new FormData($('#uploadForm')[0]);
//         $.ajax({
//             url:'/upload-museum-img',
//             type: 'POST',
//             contentType: false,
//             processData: false,
//             cache: false,
//             data: data,
//             success: function(res){
//                 alert(res);
//             },
//             error: function(){
//                 alert('Error: In sending the request!');
//             }
//         })
//     });
// });

function submitImage(){
    image = document.getElementById("imagen_principal").files[0]
    console.log(image)
    //const data = new FormData();
    //data.append("image", image);
    //console.log(data)
    ruta='/upload-museum-img'
    fetch(ruta, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'csrf-token': csrf  - aquí iría el csrf
        },
        body:JSON.stringify(image)
    })
    .then(response => response.json())
    .then(response => {
        console.log("hi image")
        
    }).catch(err => {
        console.log(err);
    });

    // $.ajax({
    //     url: '/upload-museum-img',
    //     method: 'POST',
    //     async: false,
    //     processData: false ,
    //     contentType: false,
    //     data: data
    // })
}  

function submitMuseum() {
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
    let ruta = '/museo/nuevo_museo';

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
        method: 'POST',
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
