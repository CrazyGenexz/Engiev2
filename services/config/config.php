<?php
  /*
   * Definiendo en que ambiente estamos
   */
  
  $prod = true;

  if($prod){
    require_once 'prod.php';
  }else{
    require_once 'dev.php';
  }


		
