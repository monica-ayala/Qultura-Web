console.log("imhre")
$(document).ready(function() {
    $("#uploadSala").submit(function() {
        var img = new FormData($('#uploadSala')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        
        filename = Date.now()+'-imgMuseo.jpg'
        
        let route = '/uploads/museo/'+filetype+'/'+filename
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
            "audio_sala": ".",
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

let changed_file = false

$(document).ready(function() {

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.imgP').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function(){
     changed_file=true
     readURL(this);
    });
    
   
});

$(document).ready(function() {
    $("#modifySala").submit(function() {
        var img = new FormData($('#modifySala')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        let id_museo = document.getElementById("id_museo").value
        let id_sala = document.getElementById("id_sala").value

        if(changed_file){
            filename = Date.now()+'-imgMuseo.jpg'
            let route = '/uploads/museo/'+filetype+'/'+filename
            
            $.ajax({
                url: route,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                data: img
            })
        }
        
        let nom_sala = document.getElementById("nom_sala")
        let desc_sala = document.getElementById("desc_sala")
        let ruta = '/museo/'+ id_museo +'/' + id_sala
        
        let data = {
            "nom_sala": nom_sala.value,
            "desc_sala": desc_sala.value,
            "audio_sala": ".",
            "img_sala": filename,
            "id_sala" : id_sala
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