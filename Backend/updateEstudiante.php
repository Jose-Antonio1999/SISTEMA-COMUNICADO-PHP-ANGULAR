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
  $id_alumno = mysqli_real_escape_string($conexion,trim($Alumnado->id_alumno));
  $id_apoderado = mysqli_real_escape_string($conexion,$Alumnado->id_apoderado);
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

  //obtener ID grado/seccion

  $sqlGD = "SELECT id_grado_seccion FROM gradoseccion WHERE grado='$grado' and seccion='$seccion';";
  $queryGD = mysqli_query($conexion,$sqlGD);

  while($idGD = mysqli_fetch_array($queryGD)){
    $idGradoSeccion = $idGD['id_grado_seccion'];
  }

  $sqlUpdateStudent = " UPDATE alumno SET DNI_alumno='$dni_estudiante',
                                          nombre_alumno='$nombre_estudiante',
                                          apellidoPaterno_alumno='$apellidoP_estudiante',
                                          apellidoMaterno_alumno='$apellidoM_estudiante',
                                          id_grado_seccion='$idGradoSeccion' WHERE id_alumno = '$id_alumno' ";

  $sqlUpdateFather = "UPDATE apoderado SET  DNI_apoderado='$dni_apoderado',
                                            nombre_apoderado= '$nombre_apoderado',
                                            apellidoPaterno_apoderado ='$apellidoP_apoderado',
                                            apellidoMaterno_apoderado ='$apellidoM_apoderado',
                                            email_apoderado = '$correo_apoderado',
                                            celular_apoderado = '$celular_apoderado' WHERE id_apoderado = '$id_apoderado'";
  $queryS = mysqli_query($conexion,$sqlUpdateStudent);
  $queryF = mysqli_query($conexion,$sqlUpdateFather);

  if(!$queryS && !$queryF){
    echo json_encode("0");
  }else{
    echo json_encode("1");
  }

}
