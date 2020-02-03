<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
                "username",
                "password");
            if($this->validaIndices($indices, $data)){
                echo $this->login($data);
            }else{
                echo "Faltan indices";
            }
        }
    private function login($data){  
        try {
            $serverName = "localhost"; //serverName\instanceName
            $connectionInfo = array( "Database"=>"Engie20191124123249_db", "UID"=>"engieAdmin", "PWD"=>"@password123");
            $conn = sqlsrv_connect( $serverName, $connectionInfo);

            $queryBusqueda = "SELECT UserName, Password, TipoUser, UserId, Nombre FROM dbo.Users
            WHERE UserName = (?) AND Password  = (?);";

            /*$queryBusqueda2 = "SELECT TipoUser FROM dbo.Users
            WHERE UserName = (?) AND Password  = (?);";

            $queryBusqueda3 = "SELECT UserId FROM dbo.Users
            WHERE UserName = (?) AND Password  = (?);";*/

             $username=$data['username'];
             $password=$data['password'];
             
             //RESPUESTA DE QUE SI EXISTE
             $params=array($username,$password);
             $cmd = sqlsrv_query($conn, $queryBusqueda, $params);
             $rows = sqlsrv_has_rows($cmd);
             if ($cmd) { 
               
               $row2 = sqlsrv_fetch_array( $cmd, SQLSRV_FETCH_ASSOC);
               
               if( $rows === true){
                
                 //return $this->response(200, $tipoUsuario, $idUsuario); 
                $response = array('codigo' => 200, 'body'=>$row2);
                return json_encode($response);
                // return $this->response(200, $tipoUsuario, $idUsuario);
               }
               else{
                $response = array('codigo' => 400, 'msg'=>'No existe en la base de Datos');
                return json_encode($response);
               }

            } else {  
                $response = array('codigo' => 401, 'msg'=>'Erro de Conexión');
                return json_encode($response);
                die(print_r(sqlsrv_errors(), true));  
            }
            sqlsrv_close( $conn );
            
        } catch (Exception $ex) {
            echo "Exception -> ";
            var_dump($ex->getMessage());
        }
    }
}
