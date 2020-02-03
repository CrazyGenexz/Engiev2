<?php 
  /*
  * ZONA HORARIA
  */
  date_default_timezone_set('America/Mexico_City');
  // Unix
  setlocale(LC_TIME, 'es_ES.UTF-8');
  // En windows
  setlocale(LC_TIME, 'spanish');

  /**
   * CONEXION A BD
   */
  define("BD_HOST", "127.0.0.1");
  define("BD_NOMBRE", "celex");
  define("BD_USUARIO", "postgres");
  define("BD_CLAVE", '$%#celex.$%#');

  /**
   * API_KEY PARA ENVIO DE PROMOCIONES
   */
  define("API_KEY", "76fb5d5b-f2e0-44a1-b1c6-d2b57049f9cb");


  /**
   * ENVIAR RECARGA 
   */
  define('WSDL_URL', 'http://devprontipagos.domainscm.com:28181/siveta-endpoint-ws-1.0-SNAPSHOT/ProntipagosTopUpServiceEndPoint?wsdl');
  define('LOGIN_WSDL', 'pruebasPronti@pagos.com');
  define('PASSWORD_WSDL', 'ProntiP30%');