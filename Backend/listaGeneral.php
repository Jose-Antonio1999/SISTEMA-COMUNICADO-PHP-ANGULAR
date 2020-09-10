<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$sql = "SELECT DISTINCT * FROM alumno INNER JOIN gradoseccion on alumno.id_grado_seccion = gradoseccion.id_grado_seccion
                                      INNER JOIN apoderado on alumno.id_apoderado=apoderado.id_apoderado";
$query = mysqli_query($conexion,$sql);

$lista = [];
$i = 0;

while($filas = mysqli_fetch_array($query)){

  $lista[$i]['id_grado_seccion'] = $filas['id_grado_seccion'];
  $lista[$i]['grado'] = $filas['grado'];
  $lista[$i]['seccion'] = $filas['seccion'];

  $lista[$i]['id_alumno'] = $filas['id_alumno'];
  $lista[$i]['DNI_alumno'] = $filas['DNI_alumno'];
  $lista[$i]['nombre_alumno'] = $filas['nombre_alumno'];
  $lista[$i]['apellidoPaterno_alumno'] = $filas['apellidoPaterno_alumno'];
  $lista[$i]['apellidoMaterno_alumno'] = $filas['apellidoMaterno_alumno'];
  $lista[$i]['promocion'] = $filas['promocion'];
  $lista[$i]['seccion'] = $filas['seccion'];

  $lista[$i]['id_apoderado'] = $filas['id_apoderado'];
  $lista[$i]['DNI_apoderado'] = $filas['DNI_apoderado'];
  $lista[$i]['nombre_apoderado'] = $filas['nombre_apoderado'];
  $lista[$i]['apellidoPaterno_apoderado'] = $filas['apellidoPaterno_apoderado'];
  $lista[$i]['apellidoMaterno_apoderado'] = $filas['apellidoMaterno_apoderado'];
  $lista[$i]['email_apoderado'] = $filas['email_apoderado'];
  $lista[$i]['celular_apoderado'] = $filas['celular_apoderado'];


  $i++;
}

echo json_encode($lista);
