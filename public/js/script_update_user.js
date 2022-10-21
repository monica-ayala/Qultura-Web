

$(document).ready(function(){
    
    $('select').formSelect();
    $('.formSelect').formSelect();
    $('#modal1').modal({
        onCloseEnd: function(){
           $('#modal1').empty();
           $('.formSelect').empty();
           $('select').empty();
        },
    });
   
  });

  $('.formSelect').on('contentChanged', function() {
    $(this).formSelect();
  });  

// getInfoUser
// Funcion para cargar los datos del usuario en el modal
// para su visualizacion y modificacion

function getInfoUser(element){
    jQuery('#modal1').modal('open');

    let selectrol=document.getElementById("sl_roles");
    let selectmuseos=document.getElementById("sl_museos");
    let name=document.getElementById("nom_user");
    let user_id = element.id; 
    let correo=document.getElementById("correo");

    name.innerHTML=""
    correo.innerHTML=""
    selectmuseos.innerHTML=""
    selectrol.innerHTML=""
    let ruta ="/usuario/rol/"+ user_id;

    // Asynchronous GET
    fetch(ruta,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
            name.innerHTML+='<label for="disabled">Nombre:</label>'
            name.innerHTML+="<input disabled value="+response.usuario[0].nom_user+" id='disabled' type='text' class='validate'></input>"
          
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
                selectmuseos.innerHTML+='<option value='+museo.id_museo+'>'+museo.nom_museo+'</option>'
            }
            $('select').formSelect();
            $("#sl_museos").trigger('contentChanged');
           
    }).catch(err => {
        console.log(err);
    });

}

// On modal close
function closeUser(){
    jQuery('#modal1').modal('close');
}

// updateUser
// Funcion que se ejecuta al guardar los cambios realizados 
// donde se manda a llamar a una ruta para ejecutar los cambios en la bd
function updateUser(){
    let user_id = document.getElementById("id_user").value;
    let ruta ="/usuario/rol/"+ user_id;
    let rol= document.getElementById("sl_roles");
    let value = rol.options[rol.selectedIndex].value;

    let museo= document.getElementById("sl_museos");
    let value_museo = museo.options[museo.selectedIndex].value;

    // Data to send as JSON
    data = {
        id_rol : value,
        id_user : user_id,
        id_museo : value_museo
    }

    // Asynchronous POST
    fetch(ruta,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }) .then(response => response.json())
    .then(response=>{
        location. reload()
    })
    .catch(err=>{console.log(err)})
}


  var search_input = document.querySelector("#search_input");

  search_input.addEventListener("keyup", function(e){
    var span_items = document.querySelectorAll(".table_body ul li .item .name span");
    var search_item = e.target.value.toLowerCase();
   
   span_items.forEach(function(item){
     if(item.textContent.toLowerCase().indexOf(search_item) != -1){
        item.closest("li").style.display = "block"
     }
     else{
       item.closest("li").style.display = "none";
     }
   })
    
  });
  
// myFunction
// Funcion para la busqueda de usuarios 

  function myFunction() {
    // Declare variables
    var input, filter, table, tr, i,td, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
            td=tr[i].getElementsByTagName("td")[1];
            if (td){
                txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else{
                        td=tr[i].getElementsByTagName("td")[2];
                        if (td){
                            txtValue = td.textContent || td.innerText;
                                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                    tr[i].style.display = "";
                                }else{
                                    tr[i].style.display = "none";
                                }
                    }
            }
        }
      }
    }
  }
}