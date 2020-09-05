<?php
//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

// Get obtenemos los datos
$Data = file_get_contents("php://input");

if(isset($Data)){

    //decodificamos al formato JSON
  $comunicado = json_decode($Data);
  //obtenemos los dartos
  $idEnvio = mysqli_real_escape_string($conexion,trim($comunicado->idEnvio));
  $tipo = mysqli_real_escape_string($conexion,trim($comunicado->tipo));
  $para = mysqli_real_escape_string($conexion,trim($comunicado->para));
  $asunto = mysqli_real_escape_string($conexion,trim($comunicado->asunto));
  $cuerpo = mysqli_real_escape_string($conexion,trim($comunicado->cuerpo));

  $sql = "UPDATE comunicado SET
                  asunto = '$asunto',
                  contenido = '$cuerpo',
                  Destino ='$para',
                  tipo_comunicado = '$tipo'
                  WHERE id_Comunicado = '$idEnvio'; ";

  $query = mysqli_query($conexion,$sql);

}

if(!$query){
  echo json_encode("0");
}else{
  echo json_encode("1");
}

