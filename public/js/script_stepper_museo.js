var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
    firstActive: 0 ,
    
})

function addSalas(){
    var elements = '<li class="step"><div class="step-title waves-effect"> Sala </div><div class="step-content"><div class="input-field col s10 offset-s1"><textarea id="desc_museo" name="desc_museo" class="materialize-textarea validate"></textarea><label for="desc_museo"> Descripción </label></div><div> QUILL TEXT EDITOR? </div><div class="step-actions"><div class="row"><div class="col"> <button class="red btn btn-reset" type="reset"> Resetear <i class="material-icons left"> clear </i>  </button> </div><div class="col"> <button class="btn light-blue-secondary previous-step"> Anterior  <i class="material-icons left"> arrow_back </i> </button> </div><div class="col"> <button class="waves-effect waves dark btn light-blue-secondary next-step" type="reset"> Siguiente <i class="material-icons right"> arrow_forward </i> </button> </div></div></div></div></li>'
    var addedSteps = stepperInstace.activateStep(elements, 3);
}

$(document).ready(function() {
    $("#uploadForm").submit(function() {
        var img = new FormData($('#uploadForm')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        console.log(img)
        filename = Date.now()+'-imgMuseo.jpg'
        let route = '/uploads/'+filetype+'/'+filename
        $.ajax({
            url: route,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: img
        })

        let ruta = '/museo/nuevo_museo'

        let data = {
            "nom_museo": nom_museo.value,
            "num_museo": num_museo.value,
            "ubicacion_museo": ubicacion_museo.value,
            "desc_museo": desc_museo.value,
            "imgP_museo": filename,
            "imgB_museo": filename
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

    $("#uploadForm2").submit(function() {
        var img = new FormData($('#uploadForm2')[0]);
        let filetype = document.getElementById("event2").value
        let filename = document.getElementById("filename2").value
        filename = Date.now()+'-imgMuseo'
        let route = '/uploads/'+filetype+'/'+filename
        $.ajax({
            url: route,
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data: img
        })

        let ruta = '/museo/nuevo_museo'

    let data = {
        "nom_museo": nom_museo.value,
        "num_museo": num_museo.value,
        "ubicacion_museo": ubicacion_museo.value,
        "desc_museo": desc_museo.value,
        "imgP_museo": filename,
        "imgB_museo": filename
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

function submitMuseum(){
    let nom_museo = document.getElementById("nom_museo")
    let num_museo = document.getElementById("num_museo")
    let ubicacion_museo = document.getElementById("ubicacion_museo")
    let desc_museo = document.getElementById("desc_museo")
    let filename = document.getElementById("filename").value
    let filename2 = document.getElementById("filename2").value
    let ruta = '/museo/nuevo_museo'

    let data = {
        "nom_museo": nom_museo.value,
        "num_museo": num_museo.value,
        "ubicacion_museo": ubicacion_museo.value,
        "desc_museo": desc_museo.value,
        "imgP_museo": filename,
        "imgB_museo": filename2
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

}


// var elements;
// // The element can be a string:
// elements = '<div class="step">(...your step goes here...)</div>';
// // An array of strings:
// elements = ['<div class="step">(...your step goes here...)</div>', '<div class="step">(...your step goes here...)</div>'];
// // An HTMLCollection:
// elements = document.querySelectorAll('.steps-to-add');
// // Or an HTMLElement:
// elements = document.querySelector('.step-to-add');

// // Then you just need to run
// var addedSteps = instance.activateStep(elements, newStepsIndex);
// // And if you want, you can remove them afterwards:
// var removedSteps = instance.deactivateStep(addedSteps);
// // Or add them again :P
// var readdedSteps = instance.activateStep(removedSteps);
