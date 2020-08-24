<?php

$conexion = mysqli_connect('localhost','root','','bdwillana');

if(!$conexion){
  echo json_encode("ERROR: al conectarse a la base de datos");
}
