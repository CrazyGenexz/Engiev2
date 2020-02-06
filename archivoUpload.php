<?php
    $name = $_FILES['file-upload']['name'];
    $tmp_name = $_FILES['file-upload']['tmp_name'];
    
    $location = 'ArchivosEngie/';

    $path = $location.$name;

    if(file_exists($path)){
        echo'<script type="text/javascript">
             alert("Ese archivo ya existe");
             window.location.href="archivos.html";
            </script>';
    }
    else{
        move_uploaded_file($tmp_name, $location.$name);
        echo'<script type="text/javascript">
             window.location.href="archivos.html";
            </script>';
    }
    

?>