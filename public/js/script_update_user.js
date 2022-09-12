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
        }
    });
  });

  $('.formSelect').on('contentChanged', function() {
    $(this).formSelect();
  });  


function getInfoUser(){
    jQuery('#modal1').modal('open');
    
    let magia=document.getElementById("boton").value;
    let selectrol=document.getElementById("sl_roles");
    let selectmuseos=document.getElementById("sl_museos");
    let user_id = document.getElementById("id_user").value;

    let ruta ="/usuario/rol/"+ user_id;

    console.log( magia,user_id);

    fetch(ruta,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
            console.log(response);
            selectrol.innerHTML+='<option value="" disabled selected> Choose your option</option>'
            for (let rol of response.roles){
                //var $newOpt = $("<option>").attr("value",rol.id_rol).text(rol.nom_rol)
                //$("#mySelect").append($newOpt);
                selectrol.innerHTML+='<option value='+rol.id_rol+'>'+rol.nom_rol+'</option>'
            }
            $('select').formSelect();
            $("#sl_roles").trigger('contentChanged');

            selectmuseos.innerHTML+='<option value="" disabled selected> Choose your option</option>'
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


