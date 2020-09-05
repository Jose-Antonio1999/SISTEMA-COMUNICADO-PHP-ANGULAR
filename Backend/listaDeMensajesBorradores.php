<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$id = file_get_contents("php://input");

if(isset($id)){

  $lista = [];
  $i = 0;
  $sql = "SELECT DISTINCT* FROM comunicado WHERE estado = 'no enviado' and id_personal='$id'";
  $query = mysqli_query($conexion,$sql);

  if(!$query){
    echo json_encode("0");
  }else{
    while($filas = mysqli_fetch_array($query)){
      $lista[$i]['id_Comunicado'] = $filas['id_Comunicado'];
      $lista[$i]['asunto'] = $filas['asunto'];
      $lista[$i]['fecha'] = $filas['fecha'];
      $lista[$i]['contenido'] = $filas['contenido'];
      $lista[$i]['hora'] = $filas['hora'];
      $lista[$i]['estado'] = $filas['estado'];
      $lista[$i]['tipo_comunicado'] = $filas['tipo_comunicado'];
      $lista[$i]['id_personal'] = $filas['id_personal'];
      $lista[$i]['Destino'] = $filas['Destino'];
      $lista[$i]['visible'] = true;
      $i++;
    }
    echo json_encode($lista);
  }

}
