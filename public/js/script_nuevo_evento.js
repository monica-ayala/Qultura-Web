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

function checkform(){
    var form1 = document.getElementById("nuevo_imagen")
    if (form1.fecha_start.value > form1.fecha_end.value){
        alert("Fecha fin invalida");
        form1.fecha_end.focus();
        return false;
    }else if(form1.hora_inicio.value > form1.hora_fin.value){
        alert("Hora fin invalida");
        form1.hora_fin.focus();
        return false;
    }
    return true;


}