
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

        //Si es admin
        if($tipouser == 1){
            try {
                $serverName = "localhost"; //serverName\instanceName
                $connectionInfo = array( "Database"=>"Engie20191124123249_db", "UID"=>"engieAdmin", "PWD"=>"@password123");
                $conn = sqlsrv_connect( $serverName, $connectionInfo);

                $userid=$data['userid'];

                
                $queryBusqueda = "SELECT UserName, TipoUser FROM dbo.Users;";
                
                //RESPUESTA DE QUE SI EXISTE
                $params=array($userid);
                $cmd = sqlsrv_query($conn, $queryBusqueda, $params);
                $rows = sqlsrv_has_rows($cmd);
                

                if ($cmd) { 

                
                if( $rows === true){
    
                    //return $this->response(200, $tipoUsuario, $idUsuario); 
                    $response = array('codigo' => 200);
                    return json_encode($response);
                    // return $this->response(200, $tipoUsuario, $idUsuario);
                }
                else{
                    echo "No hay datos";
                }

                } else {  
                    echo "Row insertion failed.\n";  
                    die(print_r(sqlsrv_errors(), true));  
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
