<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
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
                $fechaActual = date('Y-m-d');;

                //Subidas de archivos en total
                $queryBusqueda1 = "SELECT COUNT(*) FROM dbo.Bitacora WHERE Id_user = (?) and ActType = 1;";

                //Subida de archivos en el día
                $queryBusqueda2 = "SELECT COUNT(*) FROM dbo.Bitacora WHERE Id_user = (?) and ActType = 1 and Dte = '". $fechaActual . "';";

                //Bajada de archivos en el día
                $queryBusqueda3 = "SELECT COUNT(*) FROM dbo.Bitacora WHERE Id_user = (?) and ActType = 2 and Dte = '". $fechaActual . "';";

                $userid=$data['userid'];

                $params=array($userid);

                $cmd1 = sqlsrv_query($conn, $queryBusqueda1, $params);
                $fcmd1 = sqlsrv_fetch_array( $cmd1, SQLSRV_FETCH_ASSOC);
                $icmd1 = implode("", $fcmd1);

                $cmd2 = sqlsrv_query($conn, $queryBusqueda2, $params);
                $fcmd2 = sqlsrv_fetch_array( $cmd2, SQLSRV_FETCH_ASSOC);
                $icmd2 = implode("", $fcmd2);

                $cmd3 = sqlsrv_query($conn, $queryBusqueda3, $params);
                $fcmd3 = sqlsrv_fetch_array( $cmd3, SQLSRV_FETCH_ASSOC);
                $icmd3 = implode("", $fcmd3);

                if ($cmd1 === false) {
                    if($cmd2 === false){
                        if($cmd3 === false){
                            return $this->response(400);
                            die(print_r(sqlsrv_errors(), true));
                        }
                    }
                
                } else {  
                    $response = array('codigo' => 200, 'subidasTotales'=>$icmd1, 'subidasHoy'=>$icmd2, 'bajadasHoy'=>$icmd3);
                    return json_encode($response);
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

