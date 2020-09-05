<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

$lista = [];
$sql = "SELECT DISTINCT personal.id_personal, DNI_personal, nombre_personal, apellidoPaterno_personal,
apellidoMaterno_personal, email_personal, celular_personal, tipoPersonal.id_tipo_personal,
tipoPersonal, estadoPersonal, id_Tutor, anio, grado, seccion, gradoseccion.id_grado_seccion
FROM tipopersonal LEFT JOIN personal ON tipopersonal.id_tipo_personal = personal.id_tipo_personal
                                            LEFT JOIN tutor on personal.id_personal=tutor.id_personal
                                            LEFT JOIN gradoseccion on tutor.id_grado_seccion=gradoseccion.id_grado_seccion";
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
    $lista[$i]['id_tipo_personal'] = $filas['id_tipo_personal'];
    $lista[$i]['tipoPersonal'] = $filas['tipoPersonal'];

    $lista[$i]['estadoPersonal'] = $filas['estadoPersonal'];
    $lista[$i]['id_Tutor'] = $filas['id_Tutor'];
    $lista[$i]['anio'] = $filas['anio'];
    $lista[$i]['grado'] = $filas['grado'];
    $lista[$i]['seccion'] = $filas['seccion'];
    $lista[$i]['id_grado_seccion'] = $filas['id_grado_seccion'];

    $i++;
  }
  echo json_encode($lista);
}
