var nombre;
var tipoUsuario;
var idUsuario;

function inicio(){
    var datosLocales = localStorage.getItem('datos');
    var datosLocales1=JSON.parse(datosLocales);
    tipoUsuario=datosLocales1.tipoUsuario;
    idUsuario = datosLocales1.idUsuario;
    nombre=datosLocales1.nombre;
    getFolders();
    /*if ((tipoUsuario==1)){
      alert('Permisos de administrador.')      
      }else{
        alert("No cuentas con los permisos necesarios.")
        window.location.replace("index.html");
      }*/

    document.getElementById("nombreusuario").innerText=nombre;
    checkRole(tipoUsuario);

    //checkRole(tipoUsuario);
}

function checkRole(tipoUsuario){

  switch(tipoUsuario){
      case 2: //Líder
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id1").style.display='none';
          getFolders();
      break;
      case 3: //Corporativo
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id1").style.display='none';
          document.getElementById("subirArchivo").style.display='none';
          getFolders();
      break;
      case 4: //Cliente
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id1").style.display='none';
          document.getElementById("subirArchivo").style.display='none';
          getFolders();
      break;
      default: //Admin
          getFolders();
      break;
  }
}

function getFolders(){
    var url="http://localhost/Engie/services/api/Carpetas/select_carpetas.php";
    console.log(idUsuario);
    var datos = { 
      "userid": idUsuario,
      "tipouser" : tipoUsuario}; 
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
  function getClientFolders(){

  }

  function getFilesFromFolderId(){

  }

  var date = Date.now;

  function uploadFile(){
      
  }