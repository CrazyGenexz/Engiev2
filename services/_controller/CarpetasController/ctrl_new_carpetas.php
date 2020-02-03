<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
                "nombre",
                "userid",
                "tipouser"
            );
            if($this->validaIndices($indices, $data)){
                echo $this->login($data);
            }else{
                echo "Faltan indices";
            }
        }
    private function login($data){
        $tipouser=$data['tipouser'];

        //Si es admin o lider
        if($tipouser == 1 || $tipouser == 2){
            try {
                $serverName = "localhost"; //serverName\instanceName
                $connectionInfo = array( "Database"=>"Engie20191124123249_db", "UID"=>"engieAdmin", "PWD"=>"@password123");
                $conn = sqlsrv_connect( $serverName, $connectionInfo);
                $fechaActual = date('Y-m-d H:i:s');;
                $nombre=$data['nombre'];
                $userid=$data['userid'];
                $params=array($nombre,$userid);
                $queryBusqueda1 = "SELECT Ruta, UserId FROM dbo.Folders Where Ruta = (?) AND UserId = (?);";
                $cmd1 = sqlsrv_query($conn, $queryBusqueda1, $params);
                if ($cmd1) { 
                    $rows = sqlsrv_has_rows($cmd1);
                    if( $rows === true){ 
                        $response = array('codigo' => 201, 'msg'=>'Error: Esa Carpeta ya se encuentra, elige otro nombre');
                        return json_encode($response);
                    }else{
                        $queryBusqueda = "INSERT INTO dbo.Folders (Ruta, UserId, CreatedDate) VALUES ((?), (?), '". $fechaActual . "');";
                        $cmd = sqlsrv_query($conn, $queryBusqueda, $params);
                        if ($cmd === false) { 

                            $response = array('codigo' => 400, 'msg'=>'No se pudo insertar la Carpeta');
                            return json_encode($response);
                        } else {  
                            $response = array('codigo' => 200, 'msg'=>'Exito');
                            return json_encode($response);
                        }
                    }
                } else {  
                    $response = array('codigo' => 404, 'msg'=>'Error: Error en la Busqueda');
                    return json_encode($response);
                    
                }
                sqlsrv_close( $conn );  
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

