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
   * URL SITIO
   */

  define('URL_SITIO', 'http://200.57.188.133/services/');

  /**
   * CONEXION A BD
   */
  define("BD_HOST", "192.168.1.240");
  define("BD_NOMBRE", "celex");
  define("BD_USUARIO", "postgres");
  define("BD_CLAVE", 'admin');

  /**
   * API_KEY PARA CODIGO POSTAL
   */
  define('API_KEY', '$2y$10$GfEMh0BveUZ07MyJt58hduknvt95Ik19NKofEthHBIEfhYK4nBpFO');


  /**
   * ENVIAR RECARGA 
   */
  define('WSDL_URL', 'http://tae.celex.com/Test/wsTAERecargas.asmx?WSDL');
  define('LOGIN_WSDL', '100195');
  define('PASSWORD_WSDL', 'T1e2s3t4');


  /**
   * ENVIO PROMOCIONES
   */
  define('URL_BROADCASTER', 'https://api.broadcaster.mx/brdcstr-endpoint-web/services/messaging/');
  define('USUARIO_BROADCASTER', 'celex');
  define('PWD_BROADCASTER', 'QYBxU7g');
  define('TOKEN_BROADCASTER', 'WttvkNboV2rck+uE+GDhOUxyKr8=');
  define('API_KEY_BROADCASTER', '137');
  define('MARCACION_BROADCASTER', '26262');