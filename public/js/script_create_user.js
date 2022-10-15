
function createUser(){
    jQuery('#modal2').modal('open');

    

    
}
 function createNew(){
    let nombre = document.getElementById("us_nombre").value;
    let correo = document.getElementById("us_correo").value;
    let password = document.getElementById("us_password").value;
    let ruta ="/usuario/crear"

    data ={
        nombre : nombre,
        correo : correo,
        password : password
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
        location.reload()
    })
    .catch(err=>{console.log(err)})

 }


