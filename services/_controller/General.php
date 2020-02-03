<?php

/**
 *
 * @author Mike
 */
class General{
  protected $cnxBd = null;
  /**
   * Crea una conexion a la base de datos especificada en 'config'
   * @return boolean
   */
  protected function conectaBd(){
        $serverName = "localhost"; //serverName\instanceName
        $connectionInfo = array( "Database"=>"Engie20191124123249_db", "UID"=>"engieAdmin", "PWD"=>"@password123");
        $conn = sqlsrv_connect( $serverName, $connectionInfo);
        if( $conn ) {
          
          return true;
        }else{
          return false;
            die( print_r( sqlsrv_errors(), true));
        }
  }

  /*
   * Genera tokenAuth unico
   */
  protected function generaTokenAuth(){
    $p = new OAuthProvider(array("oauth_signature_method" => OAUTH_SIG_METHOD_HMACSHA1));
    return bin2hex($p->generateToken(15));
  }

  /*
   * Valida que exista una cabecera de tipo Authorization
   */
  protected function validaHeaderToken(){
    try {
      $headers = apache_request_headers();
      foreach ($headers as $header => $value) {
        if($header == 'Authorization' && $value != NULL && $value != ''){
          return $value;
        }
      }
      return false;
    } catch (Exception $e) {
      return json_encode(array('respuesta' => 10, 'data' => $e->getMessage()));
    }
  }

  /*
   * Respuesta en tipo JSON
   */
  protected function response($status = 200, $json = null){
    $response = array('codigo' => $status, 'body' => $json);
    return json_encode($response);
  }

  /* 
   * Respuesta en tipo JSON para CELEX
   */
  protected function responseCelex($status = 0, $json = null, $detalle = null){
    return json_encode(array('Resultado' => array('Codigo' => $status , 'Mensaje' => $json, 'Detalle' => $detalle)));
  }

  /**
   * Valida que el indice exista en un array
   * @param type $indices es un array con los indices
   * @param type $datos es un array que contiene los datos
   */
  protected function validaIndices($indices, $datos){
    $bool = true; // Si este valor no cambia, todos los indices existen
    foreach ($indices as $key) {
      if(is_array($datos)){
        if (!array_key_exists($key, $datos)) {
          $bool = false; // Si algún indice no existe
          break;
        }
      }else{
        $bool = false;
        break;
      }
    }
    return $bool;
  }
  
  /*
   * Verificar token tipo administrador
   */
  protected function verifyUser($token_auth){
    try {
      if ($this->conectaBd()){
        $query = "SELECT
                    id,
                    token_auth
                  FROM usuario
                  WHERE activo = true
                  AND token_auth = :token_auth
                  AND id_tipo_usuario = 1 ";
        $cmd = $this->cnxBd->prepare($query);
        $cmd->bindValue(':token_auth', $token_auth, PDO::PARAM_STR);
        $cmd->execute();
        $res = $cmd->fetchObject();
        if(isset($res->token_auth)){
          $this->idAdmin = $res->id;
          return true;
        }else{
          return false;
        }
      } else {
        return json_encode(array('respuesta' => 05));
        die();
      }
    } catch (Exception $e) {
      return json_encode(array('respuesta' => 10, 'data' => $e->getMessage()));
    }
  } 

   /*
   * Verificar token tipo distribuidor
   */
  protected function verifyDistribuidor($token_auth){
    try {
      if ($this->conectaBd()){
        $query = "SELECT 
                    token_auth
                  FROM usuario
                  WHERE activo = true
                  AND token_auth = :token_auth
                  AND id_tipo_usuario = 2;";
        $cmd = $this->cnxBd->prepare($query);
        $cmd->bindValue(':token_auth', $token_auth, PDO::PARAM_STR);
        $cmd->execute();
        $res = $cmd->fetchObject();
        if(isset($res->token_auth)){
          return true;
        }else{
          return false;
        }
      } else {
        return json_encode(array('respuesta' => 05));
        die();
      }
    } catch (Exception $e) {
      return json_encode(array('respuesta' => 10, 'data' => $e->getMessage()));
    }
  } 

  /*
   * Verificar token tipo punto venta
   */
  protected function verifyPv($token_auth){
    try {
      if ($this->conectaBd()){
        $query = "SELECT
                    id,
                    token_auth
                  FROM usuario
                  WHERE activo = true
                  AND token_auth = :token_auth
                  AND id_tipo_usuario = 3;";
        $cmd = $this->cnxBd->prepare($query);
        $cmd->bindValue(':token_auth', $token_auth, PDO::PARAM_STR);
        $cmd->execute();
        $res = $cmd->fetchObject();
        if(isset($res->token_auth)){
          $this->idPuntoVenta = $res->id;
          return true;
        }else{
          return false;
        }
      } else {
        return json_encode(array('respuesta' => 05));
        die();
      }
    } catch (Exception $e) {
      return json_encode(array('respuesta' => 10, 'data' => $e->getMessage()));
    }
  } 
}
