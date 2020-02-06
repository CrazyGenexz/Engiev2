<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
                "nombre",
                "apaterno",
                "amaterno",
                "password",
                "tipouser",
                "user",
                "tipouserSes"
            );
            if($this->validaIndices($indices, $data)){
                echo $this->login($data);
            }else{
                echo "Faltan indices";
            }
        }
    private function login($data){
        $tipouser=$data['tipouser'];
        $nombre=$data['nombre'];
        $password=$data['password'];
        $apaterno=$data['apaterno'];
        $amaterno=$data['amaterno'];
        $tipouserSes=$data['tipouserSes'];
        $user=$data['user'];

        //Si es admin
        if($tipouserSes == 1){
            try {
                $serverName = "localhost"; //serverName\instanceName
                $connectionInfo = array( "Database"=>"Engie20191124123249_db", "UID"=>"engieAdmin", "PWD"=>"@password123");
                $conn = sqlsrv_connect( $serverName, $connectionInfo);
                $fechaActual = date('Y-m-d H:i:s');
                $queryCorroboracion ="SELECT UserName from Users WHERE UserName = '".$user."';";
                $cmd2 = sqlsrv_query($conn, $queryCorroboracion);
                $rows = sqlsrv_has_rows($cmd2);

                if($rows == true){
                    $response = array('codigo' => 201, 'msg'=>'Error: Ese usuario ya se encuentra, elige otro nombre');
                    return json_encode($response);
                }
                else{
  
                    $queryBusqueda = "INSERT INTO dbo.Users (Nombre, Password, ApellidoPaterno, ApellidoMaterno, FechaRegistro, FechaActualizacion,Active, TipoUser, UserName, ProfileId) VALUES ((?), (?), (?), (?),'". $fechaActual . "', '". $fechaActual . "',1, (?), (?), 1);";
    
                    $params=array($nombre,$password,$apaterno,$amaterno,$tipouser,$user);
                    $cmd = sqlsrv_query($conn, $queryBusqueda, $params);

                    if ($cmd === false) { 
                        echo "NO se pudo insertar.\n";  
                        die(print_r(sqlsrv_errors(), true));
                    
                    } else {  
                            return $this->response(200);
                    }
                }
            } catch (Exception $ex) {
                echo "Exception -> ";
                var_dump($ex->getMessage());
            }
        }
        else{
            return $this->response(206);
            echo "No tienes permisos suficientes para esta acción";
        }
    }
}

