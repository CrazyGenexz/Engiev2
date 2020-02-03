var nombre;
var tipoUsuario;
var idUsuario;

function inicio(){
    var datosLocales = localStorage.getItem('datos');
    var datosLocales1=JSON.parse(datosLocales);
    tipoUsuario=datosLocales1.tipoUsuario;
    idUsuario = datosLocales1.idUsuario;
    nombre=datosLocales1.nombre;
    getEstadisticas();
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


function getEstadisticas(){
    var url = 'http://localhost/Engie/services/api/Estadisticas/bitacora.php';
      var datos = {
        userid:idUsuario
      }; 
      console.log(JSON.stringify(datos));
      fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datos),
      mode:"cors" // data can be `string` or {object}!
      }).then((response)=>{
         response.json().then((data) => {
           console.log(data);
           if(data.codigo==200){
            var subidasT=data.subidasTotales;
            var subidasH=data.subidasHoy;
            var bajadasH=data.bajadasHoy;
            document.getElementById("totalSubido").innerHTML=subidasH;
            document.getElementById("totalDescargado").innerHTML=bajadasH;
            document.getElementById("totalArchivos").innerHTML=subidasT;

           }else{
             alert("Error en el Username o Contraseña:¡Intentalo de nuevo!");
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
          document.getElementById("table_id1").style.display='none';
          getFolders();
      break;
      case 3: //Corporativo
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id1").style.display='none';
          getFolders();
      break;
      case 4: //Cliente
          document.getElementById("menuUsuario").style.display='none';
          document.getElementById("menuEstadisticas").style.display='none';
          document.getElementById("addFolder").style.display='none';
          document.getElementById("table_id1").style.display='none';
          getFolders();
      break;
      default: //Admin
          document.getElementById("table_id2").style.display='none';
          getFolders();
      break;
  }
}