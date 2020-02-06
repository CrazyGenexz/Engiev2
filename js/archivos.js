var nombre;
var tipoUsuario;
var idUsuario;

function inicio(){
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
          getFolders();
          selectAllArchivos();
          uploadFile();
      break;
      case 3: //Corporativo
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("archivos").style.display = 'none';
          selectAllArchivos();
          getFolders();
          console.log("caí en corporativo");
      break;
      case 4: //Cliente
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("archivos").style.display = 'none';
          getFolders();
      break;
      default: //Admin
          getFolders();
          selectAllArchivos();
          uploadFile();
      break;
  }
}

function getFolders(){
    var url="http://localhost/Engie/services/api/Carpetas/select_carpetas.php";
    console.log(idUsuario);
    var datos = { 
      "userid": idUsuario,
      "tipouser" : tipoUsuario
    }; 
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datos),
      mode:"cors" // data can be `string` or {object}!
      }).then((response)=>{
         response.json().then((data) => {
           if(data.codigo==200){
             console.log(data.body);
             for(i=0; i<data.body.length; i++){
              $("#selectedCarpetas").append('<option value="'+data.body[i].FolderId+'" >"'+data.body[i].Ruta+'"</option>"');
             }
            }
           else{
            alert("Este usuario no cuenta con carpetas.");
          }
        });
    }).catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response.json()));
}

function selectAllArchivos(){
  var Table = document.getElementById("table_archivos");
  Table.innerHTML = "";
  if(tipoUsuario == 4) {

  } else {
      var url="http://localhost/Engie/services/api/Archivos/select_all_archivos.php";
        var datos = { 
          "userid": idUsuario,
          "tipouser" : tipoUsuario
        }; 
        console.log(datos);
          fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(datos),
          mode:"cors" // data can be `string` or {object}!
          }).then((response)=>{
            response.json().then((data) => {
              if(data.codigo==200){
                console.log(data.body);
                //Tabla sin opcion de elimnar para cliente y corporativo
                if(tipoUsuario == 3 || tipoUsuario ==4){
                  $("#table_archivos").append('<thead><tr><th>Fecha Ultima Act.</th><th>Archivo</th><th>Usuario</th><th>Acciones</th></tr></thead>');
                  for(i=0; i<data.body.length; i++){
                    $("#table_archivos").append('<tr id="'+data.body[i].FileId+'" ><td>"'+data.body[i].UpdatedDate.date+'"</td><td>"'+data.body[i].FileName+'"</td><td>"'+data.body[i].UserName+'"</td><td><i class="icon ion-android-download green"></i><a href="ArchivosEngie/'+data.body[i].FileName+'" download="" class="inline"> Descargar</a></td></tr>"');
                  }
                }
                //Tabla con opcion de elimnar para Lider y Administrador
                else if(tipoUsuario == 1 || tipoUsuario  == 2){
                  $("#table_archivos").append('<thead><tr><th>Fecha Ultima Act.</th><th>Archivo</th><th>Usuario</th><th>Descargar</th><th>Eliminar</th></tr></thead>');
                  for(i=0; i<data.body.length; i++){
                    $("#table_archivos").append('<tr id="'+data.body[i].FileId+'" ><td>"'+data.body[i].UpdatedDate.date+'"</td><td>"'+data.body[i].FileName+'"</td><td>"'+data.body[i].UserName+'"</td><td><i class="icon ion-android-download green"></i><a href="ArchivosEngie/'+data.body[i].FileName+'" download="" class="inline"> Descargar</a></td><td id="columna_borrar"><i class="icon ion-close red"></i><a onclick="goDelete('+data.body[i].FileId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>"');
                  }
                }

              }
              else{
                alert("Esta carpeta no tiene archivos.");
              }
            });
        }).catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response.json())); 
      }
}

function selectArchivos() {
  var Table = document.getElementById("table_archivos");
  Table.innerHTML = "";

  var folderId = document.getElementById("selectedCarpetas").value;

    if(folderId === ""){
      selectAllArchivos();
    } else {
      var url="http://localhost/Engie/services/api/Archivos/select_archivos.php";
        console.log(folderId);
        var datos = { 
          "userid": idUsuario,
          "tipouser" : tipoUsuario,
          "folderid": folderId
        }; 
          fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(datos),
          mode:"cors" // data can be `string` or {object}!
          }).then((response)=>{
            response.json().then((data) => {
              if(data.codigo==200){
                console.log(data.body);
                //Tabla sin opcion de elimnar para cliente y corporativo
                if(tipoUsuario == 3 || tipoUsuario ==4){
                  $("#table_archivos").append('<thead><tr><th>Fecha Ultima Act.</th><th>Archivo</th><th>Usuario</th><th>Acciones</th></tr></thead>');
                  for(i=0; i<data.body.length; i++){
                    $("#table_archivos").append('<tr id="'+data.body[i].FileId+'" ><td>"'+data.body[i].UpdatedDate.date+'"</td><td>"'+data.body[i].FileName+'"</td><td>"'+data.body[i].UserName+'"</td><td><i class="icon ion-android-download green"></i><a href="ArchivosEngie/'+data.body[i].FileName+'" download="" class="inline"> Descargar</a></td></tr>"');
                  }
                }
                //Tabla con opcion de elimnar para Lider y Administrador
                else if(tipoUsuario == 1 || tipoUsuario  == 2){
                  $("#table_archivos").append('<thead><tr><th>Fecha Ultima Act.</th><th>Archivo</th><th>Usuario</th><th>Descargar</th><th>Eliminar</th></tr></thead>');
                  for(i=0; i<data.body.length; i++){
                    $("#table_archivos").append('<tr id="'+data.body[i].FileId+'" ><td>"'+data.body[i].UpdatedDate.date+'"</td><td>"'+data.body[i].FileName+'"</td><td>"'+data.body[i].UserName+'"</td><td><i class="icon ion-android-download green"></i><a href="ArchivosEngie/'+data.body[i].FileName+'" download="" class="inline"> Descargar</a></td><td id="columna_borrar"><i class="icon ion-close red"></i><a onclick="goDelete('+data.body[i].FileId+')" href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>"');
                  }
                }
              }
              else{
                alert("Esta carpeta no tiene archivos.");
              }
            });
        }).catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response.json()));
      }
}

var date = Date.now;

function uploadFile(){
  var url="http://localhost/Engie/services/api/Archivos/upload_archivos.php";
  var btnfile = document.getElementById("file-upload");
  btnfile.addEventListener("change", function(){
  var newarchivo = document.getElementById("file-upload").value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
  console.log(newarchivo);
  var folderId = document.getElementById("selectedCarpetas").value;
  var datos = {
    nombrearchivo: newarchivo,
    userid: idUsuario,
    tipouser: tipoUsuario,
    carpetaid: folderId
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
             alert("Archivo Subido Exitosamente!");
             window.location.replace("carpeta.html");
           }if(data.codigo==400){
             alert("No se pudo subir el archivo");
             window.location.replace("carpeta.html");
          }
          else if(data.codigo == 201){
            alert("Ese archivo ya existe");
          }
           else{
             alert("Intentalo de nuevo");
             window.location.replace("carpeta.html");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
    });
}

function onClickBorrarArchivo(idArchivo){
  var url="http://localhost/Engie/services/api/Archivos/delete_archivos.php";
  var datos = {
      fileid: FileId,
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
           alert("Archivo borrado exitosamente!");
           window.location.replace("archivos.html");
         }if(data.codigo==400){
           alert("No se pudo borrar el archivo. Intenta de nuevo.");
           window.location.replace("archivos.html");
        }
         else{
           alert("Intentalo de nuevo");
           window.location.replace("archivos.html");
         }
       });
   }).catch(error => console.error('Error:', error))
     .then(response => console.log('Success:', response));
}

function goDelete(variable){
  FileId = variable;
  document.getElementById("borrarmodal").click();
}

function cerrarSesion() {
  localStorage.clear();
  window.location.replace("index.html");
}