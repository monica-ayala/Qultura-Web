// Timepicker y Datepicker funcionalidad para registrar eventos
$(document).ready(function() {
   
    $('.timepicker').timepicker({
        autoClose: true,
        twelveHour: false
    });
    $('.datepicker').datepicker({
        min: -10,
        format : 'yyyy-mm-dd',
        autoClose: true
    });

    $('select').formSelect();
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
    
     readURL(this);
    });
    
   
});

// checkform
// Validacion de las fechas y horas 
// que una no sea mayor o menor que otra
function checkform(){
    var form1 = document.getElementById("nuevo_imagen");

    if (form1.fecha_start.value > form1.fecha_end.value){

        M.toast({html: 'Fecha fin invalida', displayLength: 1500})
        form1.fecha_end.focus();
        if(form1.hora_inicio.value > form1.hora_fin.value){
            M.toast({html: 'Hora fin invalida', displayLength: 1500})
            form1.hora_fin.focus();
            return false;
        }
        return false;
    }

    if(form1.hora_inicio.value > form1.hora_fin.value){
        M.toast({html: 'Hora fin invalida', displayLength: 1500})
        form1.hora_fin.focus();
        return false;
    }
   
    return true;


}