<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

// Get obtenemos los datos
$data = file_get_contents("php://input");
$dni = json_decode($data);

if(isset($data)){
  $lista = [];
  $sql = "SELECT DISTINCT* FROM personal INNER JOIN tipopersonal on tipopersonal.id_tipo_personal=personal.id_tipo_personal
          WHERE DNI_personal = '$dni' ";
  $i = 0;
  $query = mysqli_query($conexion,$sql);

  if(!$query){
    echo json_encode("ERROR AL HACER LA CONSULTA");
  }else{
    while($filas = mysqli_fetch_array($query)){
      $lista[$i]['id_personal'] = $filas['id_personal'];
      $lista[$i]['DNI_personal'] = $filas['DNI_personal'];
      $lista[$i]['nombre_personal'] = $filas['nombre_personal'];
      $lista[$i]['apellidoPaterno_personal'] = $filas['apellidoPaterno_personal'];
      $lista[$i]['apellidoMaterno_personal'] = $filas['apellidoMaterno_personal'];
      $lista[$i]['email_personal'] = $filas['email_personal'];
      $lista[$i]['celular_personal'] = $filas['celular_personal'];
      $lista[$i]['estadoPersonal'] = $filas['estadoPersonal'];
      $lista[$i]['id_tipo_personal'] = $filas['id_tipo_personal'];
      $lista[$i]['tipoPersonal'] = $filas['tipoPersonal'];
      $i++;
    }
    echo json_encode($lista);
  }

}
