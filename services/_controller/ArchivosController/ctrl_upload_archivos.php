<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
                "nombrearchivo",
                "userid",
                "tipouser",
                "carpetaid",
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

                $nombre=$data['nombrearchivo'];
                $userid=$data['userid'];
                $carpetaid=$data['carpetaid'];

                $queryBusqueda = "INSERT INTO Files (FileName, UserId, CreatedDate, UpdatedDate, status, FolderId) 
                VALUES ('". $nombre ."', '". $userid ."', '" . $fechaActual . "', '" . $fechaActual . "', 1, '". $carpetaid ."');";

                //SE ACTUALIZA LA BITACORA CON UN NUEVO REGISTRO
                $queryUpdate = "INSERT INTO Bitacora (Id_user, Dte, ActType) VALUES ('". $userid ."', '" . $fechaActual . "', 1);";

                $cmd = sqlsrv_query($conn, $queryBusqueda);
                $cmd2 = sqlsrv_query($conn, $queryUpdate);

                if ($cmd === false) { 
                    echo "No se pudo actualizar query 1.\n";  
                    die(print_r(sqlsrv_errors(), true));
                
                } else {  
                        return $this->response(200);
                }
                if ($cmd2 === false) { 
                    echo "No se pudo actualizar quey 2.\n";  
                    die(print_r(sqlsrv_errors(), true));
                
                } else {  
                        return $this->response(200);
                }
                
            } catch (Exception $ex) {
                echo "Exception -> ";
                var_dump($ex->getMessage());
            }
        }
        //Si es cliente u operativo
        else{
            return $this->response(206);
            echo "No tienes permisos suficientes para esta acción";
        }
    }
}

