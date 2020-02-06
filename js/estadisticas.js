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


function getEstadisticas(){
    var url = 'http://localhost/Engie/services/api/Estadisticas/bitacora.php';
      var datos = {
        userid:idUsuario,
        tipouser:tipoUsuario
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
          getEstadisticas();
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
          getEstadisticas();
      break;
  }
}

function cerrarSesion() {
  localStorage.clear();
  window.location.replace("index.html");
}