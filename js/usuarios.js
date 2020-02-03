var nombre;

function inicio(){
    document.getElementById("msgerror").style.display='none';

    var datosLocales = localStorage.getItem('datos');
    var datosLocales1=JSON.parse(datosLocales);
    nombre= datosLocales1.nombre;

    document.getElementById("nombreusuario").innerText=nombre;

    consultarTodasCarpetasUsuario();
}

function consultarTodasCarpetasUsuario(){
    var url="";
    var usuario = nombre;
    var datos = {
        nombreUsuario:usuario 
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
                $("#table_id").empty();
                $("#table_id").append('<tr><th  style="color:white; text-align: center; padding:20px;">Carpeta</th><th colspan="2"">Acciones</th></tr>');
                var len = data.length;
                for (var i = 0; i < len; i++){
                    $("#table_id").append('<tr><th style="display:none;">'+data.body.carpetaid+'</th><th  style="color:black; text-align: center; padding:20px;">'+data.body.nombreCarpeta+'</th><td><i class="icon ion-edit blue"></i><a href="#modaal_editar" class="inline"> Editar</a></td><td><i class="icon ion-close red"></i><a href="#modaal_seguro" class="inline"> Eliminar</a></td></tr>');
                }
           }
           else{
            alert("Este usuario no cuenta con carpetas.");
          }
        });
    }).catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

function onClickCrearCarpeta(){
    var url="aquí consumo la liga para crear la carpeta";
    var nombreCarpetaV=document.getElementById("nombreCarpeta").value;
    var datos = {
        nombreCarpeta: nombreCarpetaV
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
             alert("Carpeta creada exitosamente!");
           }if(data.codigo==400){
             alert("No se pudo crear la carpeta. Intenta de nuevo.");
          }
           else{
             alert("Intentalo de nuevo");
           }
         });
     }).catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
}

function onClickEditarCarpeta(idCarpetaS){
    var url="aquí consumo la liga para crear la carpeta";
    var nuevoNombreCarpetaV=document.getElementById("nuevoNombreCarpeta").value;
    var datos = {
        idCarpeta: idCarpetaS,
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

function getThisCarpetaId(td){
    var thisId = td.id;

    alert(thisId);

}