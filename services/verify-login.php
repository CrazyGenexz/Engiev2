<?php session_start();
	// Muestro errores
  ini_set("display_errors", E_ALL);
  // Specify domains from which requests are allowed
  header("Content-Type: application/json; charset=utf-8");
	header("Access-Control-Allow-Origin: *");
	// Specify which request methods are allowed
	header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
	//Incluir la configuracion
  require_once 'config/config.php';
  //Controlador
  require_once '_controller/UserController/ctrl_verify_login.php';  
	$ctrl = new CtrlUser();
