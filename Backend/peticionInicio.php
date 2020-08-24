<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$lista = [];
$sql = "SELECT * FROM personal";
$i = 0;
$query = mysqli_query($conexion,$sql);

if(!$query){
  echo json_encode("ERROR AL HACER LA CONSULTA");
}else{
  while($filas = mysqli_fetch_array($query)){
    $lista[$i]['id_personal'] = $filas['id_personal'];
    $lista[$i]['DNI_personal'] = $filas['DNI_personal'];
    $lista[$i]['nombre_personal'] = $filas['nombre_personal'];
    $i++;
  }
  echo json_encode($lista);
}
