<?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
                "fileid",
                "tipouser",
                "useridupdate" //id del usuario que borro la carpeta
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
                $fechaActual = date('Y-m-d H:i:s');

                $fileid=$data['fileid'];
                $useridupdate=$data['useridupdate'];
                
                
                
                //Borrar archivo fisicamente
                $queryNombre = "SELECT FileName From Files
                WHERE FileId = '".$fileid."';";

                $cmd2 = sqlsrv_query($conn, $queryNombre);

                if ($cmd2 === false) { 
                    return $this->response("No se pudo realizar el query.");  
                    die(print_r(sqlsrv_errors(), true));
                } 
                else {  
                    
                    
                    $nombreArchivoArray = sqlsrv_fetch_array($cmd2);

                    $salida = array_slice($nombreArchivoArray, 0,1);
                    
                    $nombreArchivo = implode(" ", $salida);
                    
                    $pathCarpeta = "../../../ArchivosEngie/";

                    $pathCarpetaCompleta = $pathCarpeta.$nombreArchivo;

                
                    if (!unlink($pathCarpetaCompleta)) {  
                        return $this->response("No se puede borrar el archivo");
                    }  
                    else {  
                        
                        //Borrar archivo de la base de datos
                        $queryBusqueda = "UPDATE Files 
                        SET Status = 0, UserIdUpdate = '".$useridupdate."' 
                        WHERE FileId = '".$fileid."';";
                        
                        $cmd = sqlsrv_query($conn, $queryBusqueda);

                        if ($cmd === false) { 
                            echo "NO se pudo actualizar.\n";  
                            die(print_r(sqlsrv_errors(), true));
                        } 
                        else {  
                            return $this->response(200);
                        } 
                    }    
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

