<?php
	// Muestro errores
  ini_set("display_errors", E_ALL);
  // Specify domains from which requests are allowed
  header("Content-Type: application/json; charset=utf-8");
	header("Access-Control-Allow-Origin: *");
	// Specify which request methods are allowed
	header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  echo json_encode(array('codigo' => 200, 'body' => array("version_distribuidor" => "1.0.0", "version_punto_venta" => "1.0.0")));