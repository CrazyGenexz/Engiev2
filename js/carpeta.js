var nombre;
var tipoUsuario;
var idUsuario;

function inicio(){
  console.log("tipo usuario: " + tipoUsuario);
    document.getElementById("msgerrorCreateFolder").style.display='none'
    document.getElementById("msgerror").style.display='none';
    var datosLocales = localStorage.getItem('datos');
    console.log(datosLocales1);
    var datosLocales1=JSON.parse(datosLocales);
    tipoUsuario=datosLocales1.tipoUsuario;
    idUsuario = datosLocales1.idUsuario;
    nombre=datosLocales1.nombre;
 
    document.getElementById("nombreusuario").innerText=nombre;

    checkRole(tipoUsuario);
    getUsuarios();
    
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
            console.log(data);
              for (var i = 0; i <data.body.length; i++){
                $("#table_usuarios").append('<tr id="'+data.body[i].UserId+'"><td>"'+data.body[i].UserName+'"</td><td>"'+data.body[i].UserName.TipoUser+'"</td><td><i class="icon ion-android-download green"></i><a href="#modaal_editar" onclick="getIdUser('+data.body[i].UserId+')" class="inline"> Cambiar contraseña</a></td><td><i class="icon ion-close red"></i><a onclick="getIdUser('+data.body[i].UserId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
              }
          }
          else{
          alert("No existen usuarios aún");
          }
      });
  }).catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    
}

function checkRole(tipoUsuario){

  switch(tipoUsuario){
      case 2: //Líder
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id2").style.display='none';
          consultarTodasAdmin();
      break;
      case 3: //Corporativo
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("acciones").style.display='none';
          document.getElementById("table_id1").style.display='none';
          consultarTodasAdmin();
      break;
      case 4: //Cliente
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id1").style.display='none';
          consultarTodasAdmin();
      break;
      default: //Admin
          document.getElementById("table_id2").style.display='none';
          consultarTodasAdmin();
      break;
  }
}

function restriccionCrearCarpeta(){
  folderName = document.getElementById("nombreCarpeta").value;
  if((folderName==="") || (folderName==="null")){
    document.getElementById("msgerrorCreateFolder").style.display='block';
    bandera=false;
  }else{
    document.getElementById("msgerrorCreateFolder").style.display='none';
    bandera=true;
  }
}



function consultarTodasAdmin(){
        var url="http://localhost/Engie/services/api/Carpetas/select_carpetas.php";
        var datos = { 
          "userid": idUsuario,
        "tipouser": tipoUsuario}; 
        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(datos),
        mode:"cors" // data can be `string` or {object}!
        }).then((response)=>{
        response.json().then((data) => {
            console.log(data);
            if(data.codigo==200){
              console.log(data.body);
              console.log("si hay carpetas");
              if(tipoUsuario === 1 || tipoUsuario === 2) {
                for (var i = 0; i <data.body.length; i++){
                  $("#table_carpetas").append('<tr id="'+data.body[i].FolderId+'"><td>"'+data.body[i].Ruta+'"</td><td id="columna_editar"><i class="icon ion-edit blue"></i><button type="button" id="#modaal_editar" class="inline" onclick="getFolderId('+data.body[i].FolderId+')" > Editar</button></td><td id="columna_borrar"><i class="icon ion-close red"></i><a onclick="getIdUser('+data.body[i].UserId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
                }
              }
              else {
                for (var i = 0; i <data.body.length; i++){
                  $("#table_carpetas2").append('<tr id="'+data.body[i].FolderId+'"><td>"'+data.body[i].Ruta+'</td></tr>');
                }
              }
            }
            else{
            alert("No existen carpetas");
            }
        });
    })/*.catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));*/
  }
  
  /*var usuario = nombre;
  var datos = { userid: 1 }; 
    console.log(JSON.stringify(datos));
    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(datos),
    mode:"cors" // data can be `string` or {object}!
    }).then((response)=>{
       response.json().then((data) => {
         console.log(data);
         if(data.codigo==200){
              if(data.codigo==200){
                for (var i = 0; i <data.body.length; i++){
                  $("#table_carpetas").append('<tr id="'+data.body[i].FolderId+'"><td>"'+data.body[i].Ruta+'"</td><td><i class="icon ion-android-download green"></i><a href="#modaal_editar" onclick="getIdUser('+data.body[i].FolderId+')" class="inline"> Cambiar contraseña</a></td><td><i class="icon ion-close red"></i><a onclick="getIdUser('+data.body[i].FolderId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
                }
            }
              
             /* var len = data.length;
              for (var i = 0; i < len; i++){
                  $("#table_id").append('<tr id='+data.body.carpetaid+'><th  style="color:black; text-align: center; padding:20px;">'+data.body.nombreCarpeta+'</th><td><i class="icon ion-edit blue"></i><a href="#modaal_editar" class="inline"> Editar</a></td><td><i class="icon ion-close red"></i><a href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
              }*/
         /*}
         else{
          alert("Este usuario no cuenta con carpetas.");
        }
      });
  }).catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));*/


function onClickCrearCarpeta(){
    restriccionCrearCarpeta();
    var url="http://localhost/Engie/services/api/Carpetas/new_carpetas.php";
    var nombreCarpetaV=document.getElementById("nombreCarpeta").value;
    var datos = {
        nombre: nombreCarpetaV,
        userid: idUsuario
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
            alert("Carpeta creada exitosamente");
            window.location.replace("carpeta.html");
           }else{
            alert("No se pudo crear la carpeta. Intenta de nuevo.");
            window.location.replace("carpeta.html");
           
          }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));


}

function onClickEditarCarpeta(nombreActual){
    var url="http://localhost/Engie/services/api/Carpetas/modify_carpetas.php";
    var nuevoNombreCarpetaV=document.getElementById("nuevoNombreCarpeta").value;
    var datos = {
        nombre: nombreActual,
        userid: idUsuario,
        nombreCarpeta: nuevoNombreCarpetaV
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
             alert("Carpeta actualizada exitosamente!");
           }if(data.codigo==400){
             alert("No se pudo actualizar el nombre de la carpeta. Intenta de nuevo.");
          }
           else{
             alert("Intentalo de nuevo");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function onClickBorrarCarpeta(idCarpetaS){
    var url="aquí consumo la liga para crear la carpeta";
    var datos = {
        idCarpeta: idCarpetaS
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
             alert("Carpeta actualizada exitosamente!");
           }if(data.codigo==400){
             alert("No se pudo actualizar el nombre de la carpeta. Intenta de nuevo.");
          }
           else{
             alert("Intentalo de nuevo");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function getFolderId(variable){
  var bd = $('<a id="raisemodaledit" href="#modaal_editar" class="inline">cc</a>')
  bd.appendTo(document.body);
  document.getElementById("raisemodaledit").click();
  FolderId=variable;
  console.log(FolderId);
}