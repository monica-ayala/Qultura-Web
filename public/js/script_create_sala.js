$(document).ready(function() {
    $("#uploadSala").submit(function() {
        var img = new FormData($('#uploadSala')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        let audioname = document.getElementById("audioname").value
        filename = Date.now()+'-imgMuseo.jpg'
        audioname = Date.now()+'-audioMuseo.mp3'
        let route = '/uploads/'+filetype+'/'+filename+'/'+audioname
        id_museo = document.getElementById("id_museo").value
        

        $.ajax({
            url: route,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: img
        })

        let ruta = '/museo/'+ id_museo +'/nueva_sala'
        
        let data = {
            "nom_sala": nom_sala.value,
            "desc_sala": desc_sala.value,
            "audio_sala": audioname,
            "img_sala": filename,
            "id_museo" : id_museo
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
