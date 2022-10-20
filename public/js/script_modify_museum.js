var stepper = document.querySelector('.stepper');
var stepperInstace = new MStepper(stepper, {
    firstActive: 0,
    validationFunction: validationThrowError

})



function validationThrowError(stepperForm, activeStepContent) {
    var inputs = activeStepContent.querySelectorAll('.validate');
    var file_input = document.querySelector('#uploadFile')
    var invalid = 0;
    for (let i = 0; i < inputs.length; i++){
        if (!inputs[i].checkValidity()){
            inputs[i].classList.add("invalid");
            invalid++;
        } 
    } 

    if (invalid > 0){
        return false
    } else return true;
 }

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

function __(elem){
    return document.getElementById(elem)
}

$(document).ready(function() {
    $("#uploadForm").submit(function() {
        var img = new FormData($('#uploadForm')[0]);
        let filetype = document.getElementById("event").value
        let filename = document.getElementById("filename").value
        let id_museo = document.getElementById("id_museo").value
        let horarios = [
            {"dia":"Lunes","fin":__("hr_fin_lun").value,"inicio":__("hr_inicio_lun").value},
            {"dia":"Martes","fin":__("hr_fin_mar").value,"inicio":__("hr_inicio_mar").value},
            {"dia":"Miércoles","fin":__("hr_fin_mie").value,"inicio":__("hr_inicio_mie").value},
            {"dia":"Jueves","fin":__("hr_fin_jue").value,"inicio":__("hr_inicio_jue").value},
            {"dia":"Viernes","fin":__("hr_fin_vie").value,"inicio":__("hr_inicio_vie").value},
            {"dia":"Sábado","fin":__("hr_fin_sab").value,"inicio":__("hr_inicio_sab").value},
            {"dia":"Domingo","fin":__("hr_fin_dom").value,"inicio":__("hr_inicio_dom").value},
        ]
        console.log(horarios)

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
            
        
           
       
        let nom_museo = document.getElementById("nom_museo")
        let num_museo = document.getElementById("num_museo")
        let ubicacion_museo = document.getElementById("ubicacion_museo")
        let desc_museo = document.getElementById("desc_museo")

        let ruta = '/museo/'+id_museo
        
        let data = {
            "nom_museo": nom_museo.value,
            "num_museo": num_museo.value,
            "ubicacion_museo": ubicacion_museo.value,
            "desc_museo": desc_museo.value,
            "imgP_museo": filename,
            "imgB_museo": filename,
            "horarios" : horarios
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

const modifyForm = document.querySelector('.modifyForm');
modifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    Swal.fire(
        '¡Creación Exitosa!',
        'Se ha modificado el museo',
        'success'
      )
    setTimeout(() =>  modifyForm.submit(), 1200);
  });
//HORARIOS

// Horario lunes
var checkbox_lun = document.getElementById('checkbox_lun');

$("#checkbox_lun").change(function() { var isOpen = $("#li_l").is(".active");
    if(checkbox_lun.checked && !isOpen){$("#header_l").click()}
    else if (!checkbox_lun.checked && isOpen){$("#header_l").click()}
});

// Horario martes
var checkbox_mar = document.getElementById('checkbox_mar');

$("#checkbox_mar").change(function() { var isOpen = $("#li_m").is(".active");
    if(checkbox_mar.checked && !isOpen){$("#header_m").click()}
    else if (!checkbox_mar.checked && isOpen){$("#header_m").click()}
});

// Horario miércoles
var checkbox_mie = document.getElementById('checkbox_mie');

$("#checkbox_mie").change(function() { var isOpen = $("#li_w").is(".active");
    if(checkbox_mie.checked && !isOpen){$("#header_w").click()}
    else if (!checkbox_mie.checked && isOpen){$("#header_w").click()}
});

// Horario jueves
var checkbox_jue = document.getElementById('checkbox_jue');

$("#checkbox_jue").change(function() { var isOpen = $("#li_j").is(".active");
    if(checkbox_jue.checked && !isOpen){$("#header_j").click()}
    else if (!checkbox_jue.checked && isOpen){$("#header_j").click()}
});

// Horario viernes
var checkbox_vie = document.getElementById('checkbox_vie');

$("#checkbox_vie").change(function() { var isOpen = $("#li_v").is(".active");
    if(checkbox_vie.checked && !isOpen){$("#header_v").click()}
    else if (!checkbox_vie.checked && isOpen){$("#header_v").click()}
});

// Horario sábado
var checkbox_sab = document.getElementById('checkbox_sab');

$("#checkbox_sab").change(function() { var isOpen = $("#li_s").is(".active");
    if(checkbox_sab.checked && !isOpen){$("#header_s").click()}
    else if (!checkbox_sab.checked && isOpen){$("#header_s").click()}
});

// Horario domingo
var checkbox = document.getElementById('checkbox_dom');

$("#checkbox_dom").change(function() { var isOpen = $("#li_d").is(".active");
    if(checkbox_dom.checked && !isOpen){$("#header_d").click()}
    else if (!checkbox_dom.checked && isOpen){$("#header_d").click()}
});