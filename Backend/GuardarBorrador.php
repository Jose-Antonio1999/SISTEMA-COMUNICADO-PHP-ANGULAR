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
  $DATA = json_decode($data);
  //obtenemos los dartos
  $idEnvio = mysqli_real_escape_string($conexion,trim($DATA->idEnvio));
  $asunto = mysqli_real_escape_string($conexion,trim($DATA->asunto));
  $cuerpo = mysqli_real_escape_string($conexion,trim($DATA->cuerpo));
  $para = mysqli_real_escape_string($conexion,trim($DATA->para));
  $tipo = mysqli_real_escape_string($conexion,trim($DATA->tipo));
  //Codigo de envio de gmail
  $fechaActual = date('Y-m-d');
  $HoraActual = date('H:i:s');

  $sql = "INSERT INTO comunicado VALUES (NULL,'$asunto', '$fechaActual','$cuerpo','$HoraActual','no enviado','$para','$tipo','$idEnvio'); ";
  $querys = mysqli_query($conexion,$sql);

}

if(!$querys){
  echo json_encode('0');
}else{
  echo json_encode('1');
}

