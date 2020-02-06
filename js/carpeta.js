var nombre;
var tipoUsuario;
var idUsuario;

function inicio(){
    document.getElementById("msgerrorCreateFolder").style.display='none'
    document.getElementById("msgerror").style.display='none';

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
                  $("#table_carpetas").append('<tr id="'+data.body[i].FolderId+'"><td>"'+data.body[i].Ruta+'"</td><td id="columna_editar"><i class="icon ion-edit blue"></i><button type="button" id="#modaal_editar" class="inline" onclick="getFolderId('+data.body[i].FolderId+')" > Editar</button></td><td id="columna_borrar"><i class="icon ion-close red"></i><a onclick="goDelete('+data.body[i].FolderId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
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
  

function onClickCrearCarpeta(){
    restriccionCrearCarpeta();
    if(bandera) {
        var url="http://localhost/Engie/services/api/Carpetas/new_carpetas.php";
        var nombreCarpetaV=document.getElementById("nombreCarpeta").value;
        var datos = {
            nombre: nombreCarpetaV,
            userid: idUsuario,
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
                alert("Carpeta creada exitosamente");
                window.location.replace("carpeta.html");
              }else{
                alert("No se pudo crear la carpeta. Intenta de nuevo.");
                window.location.replace("carpeta.html");
              
              }
            });
        }).catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
      } else {
        document.getElementById("msgerrorCreateFolder").style.display='inline'
      }


}

function editarCarpeta(nombreActual){
    var url="http://localhost/Engie/services/api/Carpetas/modify_carpetas.php";
    var nuevoNombreCarpetaV=document.getElementById("nuevoNombreCarpeta").value;
    var datos = {
      folderid: FolderId,
      nuevonombre: nuevoNombreCarpetaV,
      tipouser: tipoUsuario,
      useridupdate: idUsuario
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
             window.location.replace("carpeta.html");
           }if(data.codigo==400){
             alert("No se pudo actualizar el nombre de la carpeta. Intenta de nuevo.");
             window.location.replace("carpeta.html");
          }
           else{
             alert("Intentalo de nuevo");
             window.location.replace("carpeta.html");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function onClickBorrarCarpeta(idCarpetaS){
    var url="http://localhost/Engie/services/api/Carpetas/delete_carpetas.php";
    var datos = {
        folderid: FolderId,
        tipouser: tipoUsuario,
        useridupdate: idUsuario
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
             alert("Carpeta borrada exitosamente!");
             window.location.replace("carpeta.html");
           }if(data.codigo==400){
             alert("No se pudo borrar la carpeta. Intenta de nuevo.");
             window.location.replace("carpeta.html");
          }
           else{
             alert("Intentalo de nuevo");
             window.location.replace("carpeta.html");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function getFolderId(variable){
  document.getElementById("editarmodal").click();
  FolderId=variable;
}


function reload(){
  window.location.replace("carpeta.html");
}

function goDelete(variable){
  FolderId = variable;
  document.getElementById("borrarmodal").click();
}



function cerrarSesion() {
    localStorage.clear();
    window.location.replace("index.html");
}