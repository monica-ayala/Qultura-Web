$(document).ready(function() {
    $("#uploadObra").submit(function() {
        var img = new FormData($('#uploadObra')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        let audioname = document.getElementById("audioname").value
        filename = Date.now()+'-imgMuseo.jpg'
        audioname = Date.now()+'-audioMuseo.mp3'
        let route = '/uploads/'+filetype+'/'+filename+'/'+audioname
        id_museo = document.getElementById("id_museo").value
        id_sala = document.getElementById("id_sala").value
        
        $.ajax({
            url: route,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: img
        })

        let ruta = '/museo/'+ id_museo +'/' + id_sala+ '/nueva_obra'

        let nom_obra = document.getElementById("nom_obra").value;
        let autor_obra = document.getElementById("autor_obra").value;
        let desc_obra = document.getElementById("desc_obra").value;
        let fecha_obra = document.getElementById("fecha_obra").value;

        let data = {
            "nom_obra": nom_obra,
            "subtitulo_obra": desc_obra,
            "audio_obra": audioname,
            "img_obra": filename,
            "fecha_obra": fecha_obra,
            "autor_obra" : autor_obra,
            "desc_obra" : desc_obra,
            "id_sala": id_sala
        }
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
            
        }).catch(err => {
            console.log(err);
        });
    });
});
