
    <?php
    require_once '../../_controller/General.php';

    class Ctrl_login extends General {

        public function __construct() {
            $data = json_decode(file_get_contents('php://input'), true);
            $indices = array(
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
                //$userid=$data['userid'];
                $queryBusqueda = "SELECT UserName, TipoUser, UserId FROM dbo.Users where Active=1;";
                
                //RESPUESTA DE QUE SI EXISTE
                //$params=array($userid);
                $cmd = sqlsrv_query($conn, $queryBusqueda);
                $rows = sqlsrv_has_rows($cmd);
                if ($cmd) { 
                    if( $rows === true){
                    //return $this->response(200, $tipoUsuario, $idUsuario); ç
                    /* Setup an empty array */
                    $json = array();
                    /* Iterate through the table rows populating the array */
                    do {
                        while ($row = sqlsrv_fetch_array($cmd, SQLSRV_FETCH_ASSOC)) {
                        $json[] = $row;
                        }
                    } while ( sqlsrv_next_result($cmd) );
                    
                    /* Run the tabular results through json_encode() */
                    /* And ensure numbers don't get cast to trings */
                    $response = array('codigo' => 200, 'body'=>$json);
                    return json_encode($response);
    
                    
                
                    
                    // return $this->response(200, $tipoUsuario, $idUsuario);
                    }
                    else{
                    $response = array('codigo' => 201, 'msg'=>'No se encontraron Datos');
                    return json_encode($response);
                    }
    
                } else {  
                    $response = array('codigo' => 400, 'msg'=>'Error: Error en la Conexion');
                    return json_encode($response);
                    die(print_r(sqlsrv_errors(), true));  
                }
    
                sqlsrv_close($conn);
                
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
 