<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$lista = [];
$i = 0;
$sql = "SELECT * FROM personal";
$query = mysqli_query($conexion,$sql);

if(mysqli_num_rows($query)>0){

  if(!$query){
    echo json_encode("ERROR AL HACER LA CONSULTA");
  }else{
    while($filas = mysqli_fetch_array($query)){
      $lista[$i]['id_personal'] = $filas['id_personal'];
      $lista[$i]['DNI_personal'] = $filas['DNI_personal'];
      $lista[$i]['nombre_personal'] = $filas['nombre_personal'];
      $i++;
    }
    echo json_encode("1");
  }

}else{
  echo json_encode("0");
}
