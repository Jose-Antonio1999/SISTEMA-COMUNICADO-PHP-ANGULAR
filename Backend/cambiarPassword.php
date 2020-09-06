<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

// Get obtenemos los datos
$data = file_get_contents("php://input");

if(isset($data)){

    //decodificamos al formato JSON
  $Data = json_decode($data);
  //obtenemos los dartos
  $dni = mysqli_real_escape_string($conexion,trim($Data->dnis));
  $pass1 = mysqli_real_escape_string($conexion,trim($Data->primero));
  $pass2 = mysqli_real_escape_string($conexion,$Data->segundo);

  if($pass1 == $pass2){
    $sql = "UPDATE usuario SET Contrasenia = '$pass2' WHERE Correo = '$dni'";
    $query = mysqli_query($conexion,$sql);

    if(!$query){
      echo json_encode('0');
    }else{
      echo json_encode('1');
    }

  }else{
    echo json_encode('0');
  }


}
