var username="null";
var password="null";
var bandera;

function inicioJS(){
    document.getElementById("rest-username").style.display='none';
    document.getElementById("rest-password").style.display='none';
}

function restricciones(){
    username= document.getElementById("usuario").value;
    password= document.getElementById("contrasena").value;
    if((username==="") || (username==="null")){
      document.getElementById("rest-username").style.display='block';
      bandera=false;
    }else{
      document.getElementById("rest-username").style.display='none';
      bandera=true;
    }
    if((password==="") || (password==="null")){
      document.getElementById("rest-password").style.display='block';
      bandera=false;
    }else{
      document.getElementById("rest-password").style.display='none';
      bandera=true;
    }
  }


  function enviarDatos(){
    restricciones();
    if(bandera===true){
      var url = 'http://localhost/Engie/services/api/Usuario/login.php';
      var datos = {
          username:username,
          password:password
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
            console.log(data);
            var tipoUsuarioL = data.body.TipoUser;
            var idUsuarioL = data.body.UserId;
            var nombreL= data.body.Nombre;
            var objecto = { 'nombre': nombreL , 'tipoUsuario': tipoUsuarioL , 'idUsuario': idUsuarioL };
            localStorage.setItem('datos', JSON.stringify(objecto));
            window.location.replace("carpeta.html");
           }else{
             alert("Error en el Username o Contraseña:¡Intentalo de nuevo!");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
    }
  }
  
  