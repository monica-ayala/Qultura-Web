var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
    firstActive: 0
})

var changedFile = false;
var changedAudio = false;

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
     changedFile=true
     readURL(this);
    });

    $("#uploadAudio").on('change', function(){
        changedAudio=true
        
       });
    
   
});

$(document).ready(function() {
    $("#uploadObra").submit(function() {
        var img = new FormData($('#uploadObra')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        let audioname = document.getElementById("audioname").value
        filename = Date.now()+'-imgMuseo.jpg'
        audioname = Date.now()+'-audioMuseo.mp3'
        let route = '/uploads/museo/multiple/'+filename+'/'+audioname
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
// });

// $(document).ready(function() {
    $("#modifyObra").submit(function() {
        var img = new FormData($('#modifyObra')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        let audioname = document.getElementById("audioname").value
        
        if(changedAudio && changedFile){
            // uploads both
            filename = Date.now()+'-imgMuseo.jpg'
            audioname = Date.now()+'-audioMuseo.mp3'
            let route = '/uploads/museo/multiple/'+filename+'/'+audioname

            $.ajax({
                url: route,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                data: img
            })
           
        }
        else if (changedFile){
            // uploads img, changes img name, doesnt change audio
            filename = Date.now()+'-imgMuseo.jpg'
            let route = '/uploads/museo/'+filename


            $.ajax({
                url: route,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                data: img
            })

        }
        else if (changedAudio){
            // uploads audio, changes audio, doesnt change img
            audioname = Date.now()+'-audioMuseo.mp3'
            let route = '/uploads/audio/museo/'+ audioname


            $.ajax({
                url: route,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                data: img
            })
        }
        else{
            //nothing
        }
        
        id_museo = document.getElementById("id_museo").value
        id_sala = document.getElementById("id_sala").value
        id_obra = document.getElementById("id_obra").value
        let ruta = '/museo/'+ id_museo +'/' + id_sala+ '/'+id_obra

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
            "id_obra": id_obra
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

const modifyForm = document.querySelector('form');
modifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    Swal.fire(
        '¡Éxito!',
        'Se ha modificado la obra',
        'success'
      )
    setTimeout(() =>  modifyForm.submit(), 1200);
  });