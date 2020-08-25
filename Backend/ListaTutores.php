<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$sql = "SELECT DISTINCT * FROM personal INNER JOIN tutor on personal.id_personal=tutor.id_personal
                                        INNER JOIN gradoseccion on tutor.id_grado_seccion=gradoseccion.id_grado_seccion";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while($filas = mysqli_fetch_array($query)){
  $lista[$i]['id_personal'] = $filas['id_personal'];
  $lista[$i]['DNI_personal'] = $filas['DNI_personal'];
  $lista[$i]['nombre_personal'] = $filas['nombre_personal'];
  $lista[$i]['apellidoPaterno_personal'] = $filas['apellidoPaterno_personal'];
  $lista[$i]['apellidoMaterno_personal'] = $filas['apellidoMaterno_personal'];
  $lista[$i]['email_personal'] = $filas['email_personal'];
  $lista[$i]['celular_personal'] = $filas['celular_personal'];
  $lista[$i]['id_tipo_personal'] = $filas['id_tipo_personal'];
  $lista[$i]['id_grado_seccion'] = $filas['id_grado_seccion'];
  $lista[$i]['grado'] = $filas['grado'];
  $lista[$i]['seccion'] = $filas['seccion'];

  $i++;
}

echo json_encode($lista);
