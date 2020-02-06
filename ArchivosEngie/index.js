'use strict'

//variable mssql
var mssql = require('mssql');

//plantillas
app.set('view engine', 'ejs');

//Establece el puerto
var port = process.env.PORT || 5000;

//variables de conexion
var config = {
	user : 'engieAdmin',
	password : '@password123',
	server : 'WIN-NLP90HO79S4',
	port : '1433',
	database : 'Engie20191124123249_db',

};

//Error

var connection = mssql.connect(config, function(err, res){
	if(err){
		throw err;
	}
	else{
		console.log("Conexión exitosa");
		app.listen(port, function(){
			console.log("Api Rest Running http://localhost");
		})
	}
})