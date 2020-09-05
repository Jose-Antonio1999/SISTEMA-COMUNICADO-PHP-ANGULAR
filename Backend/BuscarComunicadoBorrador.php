<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$data = file_get_contents("php://input");

if(isset($data)){

  $lista = [];
  $sql = "SELECT DISTINCT* FROM comunicado WHERE tipo_comunicado like '$data%' and estado='no enviado' ";
  $i = 0;
  $query = mysqli_query($conexion,$sql);

  if(!$query){
    echo json_encode("ERROR AL HACER LA CONSULTA");
  }else{
    while($filas = mysqli_fetch_array($query)){
      $lista[$i]['id_Comunicado'] = $filas['id_Comunicado'];
      $lista[$i]['asunto'] = $filas['asunto'];
      $lista[$i]['fecha'] = $filas['fecha'];
      $lista[$i]['contenido'] = $filas['contenido'];
      $lista[$i]['hora'] = $filas['hora'];
      $lista[$i]['estado'] = $filas['estado'];
      $lista[$i]['tipo_comunicado'] = $filas['tipo_comunicado'];
      $lista[$i]['Destino'] = $filas['Destino'];
      $lista[$i]['id_personal'] = $filas['id_personal'];
      $i++;
    }
    echo json_encode($lista);
  }

}
