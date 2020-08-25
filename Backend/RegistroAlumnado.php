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
  $personal = json_decode($data);
  //obtenemos los dartos

  $grado = mysqli_real_escape_string($conexion,trim($personal->grado));
  $seccion = mysqli_real_escape_string($conexion,$personal->seccion);
  $tipoPersonal = mysqli_real_escape_string($conexion,$personal->tipoPersonal);
  $DNI_personal = mysqli_real_escape_string($conexion,$personal->dni);
  $nombre_personal = mysqli_real_escape_string($conexion,$personal->nombre);
  $apellidoPaterno_personal = mysqli_real_escape_string($conexion,$personal->apellidoP);
  $apellidoMaterno_personal  = mysqli_real_escape_string($conexion,$personal->apellidoM);
  $email_personal = mysqli_real_escape_string($conexion,$personal->correo);
  $celular_personal = mysqli_real_escape_string($conexion,$personal->celular);

  //query
  $sql = "INSERT INTO Personal VALUES(NULL,'$DNI_personal','$nombre_personal','$apellidoPaterno_personal','$apellidoMaterno_personal','$email_personal','$celular_personal','1','$tipoPersonal')";
  $sql2 = "INSERT INTO usuario VALUES(NULL,'$tipoPersonal','$email_personal','$DNI_personal')";
  $query = mysqli_query($conexion,$sql);
  $query2 = mysqli_query($conexion,$sql2);

  if($grado != null || $seccion !=null || $grado !="" || $seccion !=""){
    //Query obtener id
    $sql3 = "SELECT id_personal FROM Personal WHERE DNI_personal='$DNI_personal' and email_personal='$email_personal' ";
    $query3 = mysqli_query($conexion,$sql3);
    $sql4 = "SELECT id_grado_seccion FROM gradoseccion WHERE grado='$grado' and seccion='$seccion' ";
    $query4 = mysqli_query($conexion,$sql4);

    while($filaDoc = mysqli_fetch_array($query3)){
      $idDocente = $filaDoc['id_personal'];
    }
    while($filaGrad = mysqli_fetch_array($query4)){
      $idGrados = $filaGrad['id_grado_seccion'];
    }

    if($idDocente!="" and $idGrados!=""){
      $anio = date("Y");
      $sql5 = "INSERT INTO tutor VALUES(null,'$anio','$idDocente','$idGrados')";
      $query5 = mysqli_query($conexion,$sql5);
    }

  }

}

if(!$query){
  echo json_encode('ERROR: al insertar los datos');
}else{
  echo json_encode('SUCCESSFULL: insertado correctamente');
}

