$(document).ready(function(){
    $('.modal').modal();
  });

  $('.formSelect').formSelect();
  $('select').formSelect();
  $('.formSelect').on('contentChanged', function() {
    $(this).formSelect();
  });  

function getInfoUser(){
    jQuery('#modal1').modal('open');
    
    console.log("holi")

    let modal = document.getElementById("pruebita");
    let selectrol=document.getElementById("mySelect");
    let user_id = document.getElementById("id_user").value;

    let ruta ="/usuario/rol/"+ user_id;

    console.log(modal, user_id);

    fetch(ruta,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
            console.log(response);
            
           // modal.innerHTML+='<div class="input-field">'
           // modal.innerHTML+='<select id="mySelect">'
            selectrol.innerHTML+='<option value="" disabled selected> Choose your option</option>'
            for (let rol of response.roles){
                //var $newOpt = $("<option>").attr("value",rol.id_rol).text(rol.nom_rol)
                //$("#mySelect").append($newOpt);
                selectrol.innerHTML+='<option value='+rol.id_rol+'>'+rol.nom_rol+'</option>'
            }
            $("#mySelect").trigger('contentChanged');
            $('select').formSelect();
            selectrol.innerHTML+='</select> <label>Rol</label>'
            //$('select').formSelect();
            //selectrol.innerHTML+='</div>'
        
          // selectrol.innerHTML+='</div>'
        
           //selectrol.innerHTML+='</div>'
          //  modal.innerHTML+='</div>'
           // modal.innerHTML+='</div>'
        
            
            
            
           
    }).catch(err => {
        console.log(err);
    });

}


