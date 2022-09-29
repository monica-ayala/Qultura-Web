const Usuario = require("../../models/usuario");

$(document).ready(function(){
    $('.formSelect').formSelect();
    $('select').formSelect();
    $('.modal').modal({
        onOpenStart: function(){
            //str = $("#id_user").text();
        },
        onCloseEnd: function(){
            $('.formSelect').empty();
            $('select').empty();
            $('.modal').empty();
           $('modal').empty();
        }
    });
  });

  $('.formSelect').on('contentChanged', function() {
    $(this).formSelect();
  });  


function getInfoUser(element){
    jQuery('#modal1').modal('open');
    

    let selectrol=document.getElementById("sl_roles");
    let selectmuseos=document.getElementById("sl_museos");
    let name=document.getElementById("nom_user");
    let user_id = element.id; 
    let correo=document.getElementById("correo");

    name.innerHTML=""
    correo.innerHTML=""
    let ruta ="/usuario/rol/"+ user_id;

    fetch(ruta,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
            console.log(response);

            name.innerHTML+=response.usuario[0].nom_user
            name.innerHTML+="<input type='hidden' value="+response.usuario[0].id_user+" id='id_user'>"
            correo.innerHTML+='<label for="disabled">Correo Electronico:</label>'
            correo.innerHTML+="<input disabled value="+response.usuario[0].correo_user+" id='disabled' type='text' class='validate'></input>"
            
            selectrol.innerHTML+='<option value='+response.usuario[0].id_rol+' disabled selected> '+response.usuario[0].nom_rol+'</option>'
            for (let rol of response.roles){
                selectrol.innerHTML+='<option value='+rol.id_rol+'>'+rol.nom_rol+'</option>'
            }
            $('select').formSelect();
            $("#sl_roles").trigger('contentChanged');

            selectmuseos.innerHTML+='<option value='+response.usuario[0].id_museo+' disabled selected>'+response.usuario[0].nom_museo+'</option>'
            for (let museo of response.museos){
                //var $newOpt = $("<option>").attr("value",rol.id_rol).text(rol.nom_rol)
                //$("#mySelect").append($newOpt);
                selectmuseos.innerHTML+='<option value='+museo.id_museo+'>'+museo.nom_museo+'</option>'
            }
            $('select').formSelect();
            $("#sl_museos").trigger('contentChanged');
           
    }).catch(err => {
        console.log(err);
    });

}


function updateUser(){
    let user_id = document.getElementById("id_user").value;
    let ruta ="/usuario/rol/"+ user_id;
    let rol= document.getElementById("sl_roles");
    let value = rol.options[rol.selectedIndex].value;

    let museo= document.getElementById("sl_museos");
    let value_museo = museo.options[museo.selectedIndex].value;

    console.log(user_id); 


    data = {
        id_rol : value,
        id_user : user_id,
        id_museo : value_museo
    }

    fetch(ruta,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }) .then(response => response.json())
    .catch(err=>{console.log(err)})
}
