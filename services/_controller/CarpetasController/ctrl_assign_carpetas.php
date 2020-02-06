<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
                "folderid",
                "userid",//id del usuario al que se le asignará la carpeta
                "tipouser",
                "useridupdate"//este es el id de la persona que se encuentra loggeada en el sistema
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

                $userid=$data['userid'];
                $folderid=$data['folderid'];
                $useridupdate=$data['useridupdate'];
        
                $queryBusqueda = "UPDATE dbo.Folders 
                SET UserId = '" . $userid . "', UpdatedDate = '". $fechaActual . "', UserIdUpdate = '" . $useridupdate . "' 
                WHERE FolderId = '" . $folderid . "';";


                $cmd = sqlsrv_query($conn, $queryBusqueda);

                if ($cmd === false) { 
                    echo "NO se pudo actualizar.\n";  
                    die(print_r(sqlsrv_errors(), true));
                
                } else {  
                        return $this->response(200);
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

