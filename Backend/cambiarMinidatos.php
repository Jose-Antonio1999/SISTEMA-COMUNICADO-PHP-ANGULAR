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
  $dni = mysqli_real_escape_string($conexion,trim($Data->dni));
  $celular = mysqli_real_escape_string($conexion,trim($Data->celular));
  $email = mysqli_real_escape_string($conexion,$Data->email);

  if(!empty($celular) && empty($email)){
    $sql = "UPDATE personal SET celular_personal='$celular' WHERE DNI_personal = '$dni' ";
    $query = mysqli_query($conexion,$sql);
    if(!$query){
      echo json_encode('0');
    }else{
      echo json_encode('1');
    }
  }

  if(empty($celular) && !empty($email)){
    $sql = "UPDATE personal SET email_personal='$email' WHERE DNI_personal = '$dni' ";
    $query = mysqli_query($conexion,$sql);
    if(!$query){
      echo json_encode('0');
    }else{
      echo json_encode('1');
    }
  }

  if(!empty($email) && !empty($celular)){
    $sql = "UPDATE personal SET email_personal='$email', celular_personal='$celular' WHERE DNI_personal = '$dni' ";
    $query = mysqli_query($conexion,$sql);
    if(!$query){
      echo json_encode('0');
    }else{
      echo json_encode('1');
    }
  }


}else{
  echo json_encode('0');
}

