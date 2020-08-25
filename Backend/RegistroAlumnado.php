<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

// Get obtenemos los datos
$data = file_get_contents("php://input");

if(isset($data)){

    //decodificamos al formato JSON
  $Alumnado = json_decode($data);
  //obtenemos los datos
  $grado = mysqli_real_escape_string($conexion,trim($Alumnado->grado));
  $seccion = mysqli_real_escape_string($conexion,$Alumnado->seccion);
  $dni_apoderado = mysqli_real_escape_string($conexion,$Alumnado->dni_apoderado);
  $nombre_apoderado = mysqli_real_escape_string($conexion,$Alumnado->nombre_apoderado);
  $apellidoP_apoderado = mysqli_real_escape_string($conexion,$Alumnado->apellidoP_apoderado);
  $apellidoM_apoderado = mysqli_real_escape_string($conexion,$Alumnado->apellidoM_apoderado);
  $correo_apoderado  = mysqli_real_escape_string($conexion,$Alumnado->correo_apoderado);
  $celular_apoderado = mysqli_real_escape_string($conexion,$Alumnado->celular_apoderado);

  $dni_estudiante = mysqli_real_escape_string($conexion,trim($Alumnado->dni_estudiante));
  $nombre_estudiante = mysqli_real_escape_string($conexion,$Alumnado->nombre_estudiante);
  $apellidoP_estudiante = mysqli_real_escape_string($conexion,$Alumnado->apellidoP_estudiante);
  $apellidoM_estudiante = mysqli_real_escape_string($conexion,$Alumnado->apellidoM_estudiante);
  $correo_estudiante = mysqli_real_escape_string($conexion,$Alumnado->correo_estudiante);
  $celular_estudiante = mysqli_real_escape_string($conexion,$Alumnado->celular_estudiante);

  $sql = "INSERT INTO apoderado VALUES(NULL,'$dni_apoderado','$nombre_apoderado','$apellidoP_apoderado','$apellidoM_apoderado','$correo_apoderado','$celular_apoderado');";
  $query = mysqli_query($conexion,$sql);

  $sql1 = "SELECT id_apoderado FROM apoderado WHERE DNI_apoderado='$dni_apoderado' and email_apoderado='$correo_apoderado' ";
  $query1 = mysqli_query($conexion,$sql1);

  while($fila = mysqli_fetch_array($query1)){
    $idApoderado = $fila['id_apoderado'];
  }

  $sql2 = "SELECT id_grado_seccion FROM gradoseccion WHERE grado='$grado' and seccion='$seccion' ";
  $query2 = mysqli_query($conexion,$sql2);

  while($filas2 = mysqli_fetch_array($query2)){
    $idGradoSeccion = $filas2['id_grado_seccion'];
  }
  $anio = date("Y") + 5;
  $sql3 = "INSERT INTO alumno VALUES(NULL,'$dni_estudiante','$nombre_estudiante','$apellidoP_estudiante','$apellidoM_estudiante','$anio','1','$idGradoSeccion','$idApoderado') ";
  $query3 = mysqli_query($conexion,$sql3);

  if(!$sql3){
    echo json_encode("Algo salió mal");
  }else{
    echo json_encode("Registro exitoso");
  }

}
