<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$lista = [];
$sql = "SELECT DISTINCT * FROM gradoseccion";
$i = 0;
$query = mysqli_query($conexion,$sql);

if(!$query){
  echo json_encode("ERROR AL HACER LA CONSULTA");
}else{
  while($filas = mysqli_fetch_array($query)){
    $lista[$i]['id_grado_seccion'] = $filas['id_grado_seccion'];
    $lista[$i]['grado'] = $filas['grado'];
    $lista[$i]['seccion'] = $filas['seccion'];
    $i++;
  }
  echo json_encode($lista);
}
