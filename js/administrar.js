var nombre;
var tipoUsuario;
var idUsuario;
var idUsarioGlobal;
var conversionUsuario;

function inicio(){
    document.getElementById("acceso").style.display='none';
    document.getElementById("errorNombre").style.display='none';
    document.getElementById("errorPaterno").style.display='none';
    document.getElementById("errorUsuario").style.display='none';
    document.getElementById("errorPassword").style.display='none';
    document.getElementById("errorSelect").style.display = 'none';
    document.getElementById("passwordError").style.display = 'none';
    document.getElementById("nombreUsuario").value="";
    document.getElementById("apPatUsuario").value="";
    document.getElementById("apMatUsuario").value="";
    document.getElementById("usuario").value="";
    document.getElementById("password").value="";
  
    //Asignación de locales
  var datosLocales = localStorage.getItem('datos');
  console.log(datosLocales1);
  var datosLocales1=JSON.parse(datosLocales);

  tipoUsuario=datosLocales1.tipoUsuario;
  idUsuario = datosLocales1.idUsuario;
  nombre=datosLocales1.nombre;

  console.log(datosLocales1);

  if(idUsuario != null ){
    document.getElementById("acceso").style.display = 'none';
  } else {
    document.getElementById("cerrarsesion").style.display = 'none';
  }

  document.getElementById("nombreusuario").innerText=nombre;

  checkRole(tipoUsuario);
}

var selectedRoleForUser;

function placeRoleId() {
  selectedRoleForUser = document.getElementById("dropdownroles").value;
  
  if(selectedRoleForUser != "" ){
    console.log("si");
  } else {
    console.log(selectedRoleForUser);
  }

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
    console.log("SRU: " + selectedRoleForUser)
    if(selectedRoleForUser != "" ){
      document.getElementById("errorSelect").style.display = 'none';
      bandera = true;
    } else {
      document.getElementById('errorSelect').style.display = 'inline';
      bandera = false;
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
        getUsuarios();
      break;
  }
}

function getUsuarios(){
    var url='http://localhost/Engie/services/api/Usuario/busca_usuario.php';
    var datos = { 
      tipouser: tipoUsuario
     }; 
        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(datos),
        mode:"cors" // data can be `string` or {object}!
        }).then((response)=>{
        response.json().then((data) => {
            console.log(data);
            if(data.codigo==200){
              console.log("si hay usuarios");
                for (var i = 0; i < data.body.length ; i++){
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
                  $("#table_usuarios").append('<tr id="'+data.body[i].UserId+'"><td>"'+data.body[i].UserName+'"</td><td>"'+conversionUsuario+'"</td><td><i class="icon ion-android-download green"></i><button onclick="changePassword('+data.body[i].UserId+')" class="inline"> Cambiar contraseña</button></td><td><i class="icon ion-close red"></i><button type="button" onclick="deleteUser('+data.body[i].UserId+')"> Eliminar</button></td></tr>');
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
    if(bandera) {
        var url="http://localhost/Engie/services/api/Usuario/new_usuario.php";
        var nombreUsuarioI = document.getElementById("nombreUsuario").value;
        var apPatUsuarioI = document.getElementById("apPatUsuario").value;
        var apMatUsuarioI = document.getElementById("apMatUsuario").value;
        var usuarioI = document.getElementById("usuario").value;
        var passwordI = document.getElementById("password").value;
        var datos = {
            nombre: nombreUsuarioI,
            apaterno: apPatUsuarioI,
            amaterno: apMatUsuarioI, 
            password: passwordI,
            tipouser: selectedRoleForUser,
            user: usuarioI,
            tipouserSes: tipoUsuario
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
      } else {
      }
      
}

function borrarUsuario(){
  var url="http://localhost/Engie/services/api/Usuario/delete_usuario.php";
    var datos = {
        userid: idUserToChange,
        tipouser: tipoUsuario
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
             window.location.replace("administrar.html");
           }if(data.codigo==400){
             alert("No se pudo borrar al usuario. Intenta de nuevo.");
             window.location.replace("administrar.html");
          }
           else{
             alert("Intentalo de nuevo");
             window.location.replace("administrar.html");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function acceptChange(){
  if(document.getElementById("nuevaPass").value === ""){
    document.getElementById("passwordError").style.display = 'inline'
  } else {
    cambiarContrasena();
  }
}

function cambiarContrasena(){
  var nuevapass=document.getElementById("nuevaPass").value;
  var url="http://localhost/Engie/services/api/Usuario/modify_usuario.php";
    var datos = {
      userid: idUserToChange,
      password:nuevapass,
      tipouser: tipoUsuario
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
             window.location.replace("administrar.html");
           }if(data.codigo==400){
             alert("Error:Intentalo de nuevo.");
             window.location.replace("administrar.html");
          }
           else{
             alert("Intentalo de nuevo");
             window.location.replace("administrar.html");
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

function cerrarSesion() {
  localStorage.clear();
  window.location.replace("index.html");
}

var idUserToChange;

function changePassword(variable){
  console.log("changePassword");
  idUserToChange = variable;
  console.log(idUserToChange);
  document.getElementById("cambiar_contrasena").click();
}

function deleteUser(variable){
  console.log("deleteUser");
  idUserToChange = variable;
  console.log(idUserToChange);
  document.getElementById("borrar_usuario").click();
}

function reload(){
  window.location.replace("administrar.html");
}