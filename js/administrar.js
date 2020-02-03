var nombre;
var tipoUsuario;
var idUsuario;
var idUsarioGlobal;
var conversionUsuario;
function inicio(){
    document.getElementById("errorNombre").style.display='none'
    document.getElementById("errorPaterno").style.display='none';
    document.getElementById("errorUsuario").style.display='none';
    document.getElementById("errorPassword").style.display='none';
    document.getElementById("nombreUsuario").value="";
    document.getElementById("apPatUsuario").value="";
    document.getElementById("apMatUsuario").value="";
    document.getElementById("usuario").value="";
    document.getElementById("password").value="";
    var datosLocales = localStorage.getItem('datos');
    var datosLocales1=JSON.parse(datosLocales);
    tipoUsuario=datosLocales1.tipoUsuario;
    idUsuario = datosLocales1.idUsuario;
    getUsuarios();
    /*if ((tipoUsuario==1)){
      alert('Permisos de administrador.')      
      }else{
        alert("No cuentas con los permisos necesarios.")
        window.location.replace("index.html");
      }*/

    document.getElementById("nombreusuario").innerText=nombre;

    checkRole(tipoUsuario);
}

function restriccionCrearUsuario(){
    nombreUsuarioI = document.getElementById("nombreUsuario").value;
    apPatUsuarioI = document.getElementById("apPatUsuario").value;
    apMatUsuarioI = document.getElementById("apMatUsuario").value;
    usuarioI = document.getElementById("usuario").value;
    passwordI = document.getElementById("password").value;

    if((nombreUsuarioI==="") || (nombreUsuarioI==="null")){
        document.getElementById("errorNombre").style.display='block';
        bandera=false;
    }else {
        document.getElementById("errorNombre").style.display='none';
        bandera=true;
    }
    if((apPatUsuarioI==="") || (apPatUsuarioI==="null")){
      document.getElementById("errorPaterno").style.display='block';
      bandera=false;
    }else {
        document.getElementById("errorPaterno").style.display='none';
        bandera=true;
    }
    if((usuarioI==="") || (usuarioI==="null")){
      document.getElementById("errorUsuario").style.display='block';
      bandera=false;
    }
    else {
      document.getElementById("errorUsuario").style.display='none';
      bandera=true;
    }
    if((passwordI==="") || (passwordI==="null")){
      document.getElementById("errorPassword").style.display='block';
      bandera=false;
    } else { 
      document.getElementById("errorPassword").style.display='none';
      bandera = true;
    }
}

function checkRole(tipoUsuario){

  switch(tipoUsuario){
      case 2: //Líder
        alert("No tienes permisos para ingresar a esta página.")
        window.location.replace("index.html");
      break;
      case 3: //Corporativo
        alert("No tienes permisos para ingresar a esta página.")
        window.location.replace("index.html");
      break;
      case 4: //Cliente
        alert("No tienes permisos para ingresar a esta página.")
        window.location.replace("index.html");
      break;
      default: //Admin
          document.getElementById("table_id2").style.display='none';
          consultarTodasAdmin();
      break;
  }
}

function getUsuarios(){
    var url='http://localhost/Engie/services/api/Usuario/busca_usuario.php';
    var datos = {  }; 
        fetch(url, {
        method: 'POST', // or 'PUT'
        mode:"cors" // data can be `string` or {object}!
        }).then((response)=>{
        response.json().then((data) => {
            console.log(data);
            if(data.codigo==200){
              console.log("si hay usuarios");
                for (var i = 0; i <data.body.length; i++){
                  if(data.body[i].TipoUser == 1){
                    conversionUsuario = "Administrador";
                  }
                  else if(data.body[i].TipoUser == 2){
                    conversionUsuario = "Lider Operaciones";
                  }
                  else if(data.body[i].TipoUser == 3){
                    conversionUsuario = "Corporativo";
                  }
                  else if(data.body[i].TipoUser == 4){
                    conversionUsuario = "Cliente";
                  }
                  $("#table_usuarios").append('<tr id="'+data.body[i].UserId+'"><td>"'+data.body[i].UserName+'"</td><td>"'+conversionUsuario+'"</td><td><i class="icon ion-android-download green"></i><a href="#modaal_editar" onclick="getIdUser('+data.body[i].UserId+')" class="inline"> Cambiar contraseña</a></td><td><i class="icon ion-close red"></i><a onclick="getIdUser('+data.body[i].UserId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
                }
            }
            else{
            alert("No existen usuarios aún");
            }
        });
    }).catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

function crearUsuario(){
    restriccionCrearUsuario();
    var url="http://localhost/Engie/services/api/Usuario/new_usuario.php";
    var nombreUsuarioI = document.getElementById("nombreUsuario").value;
    var apPatUsuarioI = document.getElementById("apPatUsuario").value;
    var apMatUsuarioI = document.getElementById("apMatUsuario").value;
    var usuarioI = document.getElementById("usuario").value;
    var passwordI = document.getElementById("password").value;
    var rolI = document.getElementById("dropdownroles").value;
    var datos = {
        nombre: nombreUsuarioI,
        apaterno: apPatUsuarioI,
        amaterno: apMatUsuarioI, 
        password: passwordI,
        tipouser: rolI,
        user: usuarioI
    }
    console.log(JSON.stringify(datos));
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datos),
      mode:"cors" // data can be `string` or {object}!
      }).then((response)=>{
         response.json().then((data) => {
           console.log(data);
           if(data.codigo==200){
             console.log(data.body);
             alert("!Se creo el Usuario"+nombreUsuarioI+" "+apPatUsuarioI+" "+apMatUsuarioI+" correctamente!")
             window.location.replace("administrar.html");
            
           }else{
            alert("!Error: Intentalo de Nuevo!")
            window.location.replace("administrar.html");
          }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function borrarUsuario(){
  var url="http://localhost/Engie/services/api/Usuario/delete_usuario.php";
    var datos = {
        user: ''
    }
    console.log(JSON.stringify(datos));
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datos),
      mode:"cors" // data can be `string` or {object}!
      }).then((response)=>{
         response.json().then((data) => {
           console.log(data);
           if(data.codigo==200){
             console.log(data.body);
             alert("Usuario borrado exitosamente!");
           }if(data.codigo==400){
             alert("No se pudo borrar al usuario. Intenta de nuevo.");
          }
           else{
             alert("Intentalo de nuevo");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function cambiarContrasena(idUsuario){
  window.location=document.getElementById('modaal_editar').href;
  var nuevapass=document.getElementById("nuevaPass").value;
  var url="http://localhost/Engie/services/api/Usuario/modify_usuario.php";
    var datos = {
      userid: idUsuario,
      password:nuevapass
    }
    console.log(JSON.stringify(datos));
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datos),
      mode:"cors" // data can be `string` or {object}!
      }).then((response)=>{
         response.json().then((data) => {
           console.log(data);
           if(data.codigo==200){
             alert("Se cambio la contraseña Exitosamente!");
             
           }if(data.codigo==400){
             alert("Error:Intentalo de nuevo.");
          }
           else{
             alert("Intentalo de nuevo");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
  
  
}

function getIdUser(variable){
  idUsarioGlobal=variable;
  var link = $('#modaal_editar').attr('href');
  $('#modaal_editar').load(href).dialog('open');
  console.log(idUsarioGlobal);
}