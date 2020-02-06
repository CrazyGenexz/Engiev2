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


function cerrarSesion() {
    localStorage.clear();
    window.location.replace("index.html");
}