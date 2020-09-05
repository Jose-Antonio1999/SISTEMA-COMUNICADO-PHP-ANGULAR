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
  $id_Tutor = mysqli_real_escape_string($conexion,$personal->id_Tutor);
  $id_personal = mysqli_real_escape_string($conexion,$personal->id_personal);
  $tipoPersonal = mysqli_real_escape_string($conexion,$personal->tipoPersonal);
  $DNI_personal = mysqli_real_escape_string($conexion,$personal->dni);
  $nombre_personal = mysqli_real_escape_string($conexion,$personal->nombre);
  $apellidoPaterno_personal = mysqli_real_escape_string($conexion,$personal->apellidoP);
  $apellidoMaterno_personal  = mysqli_real_escape_string($conexion,$personal->apellidoM);
  $email_personal = mysqli_real_escape_string($conexion,$personal->correo);
  $celular_personal = mysqli_real_escape_string($conexion,$personal->celular);

  $sql = "UPDATE personal
                  SET DNI_personal='$DNI_personal',
                  nombre_personal='$nombre_personal',
                  apellidoPaterno_personal='$apellidoPaterno_personal',
                  apellidoMaterno_personal='$apellidoMaterno_personal',
                  email_personal='$email_personal',
                  celular_personal='$celular_personal',
                  id_tipo_personal= '$tipoPersonal'
                  WHERE id_personal = '$id_personal' ";
  $query = mysqli_query($conexion,$sql);

  if($grado!=null && $seccion!=null || $grado!="" and $seccion!=""){

    $sqlB = "SELECT id_grado_seccion FROM gradoseccion WHERE grado='$grado' and seccion='$seccion' ";
    $queryB = mysqli_query($conexion,$sqlB);

    while($fila=mysqli_fetch_array($queryB)){
      $id_grado_s = $fila['id_grado_seccion'];
    }

    if($id_grado_s!=null || $id_grado_s!=""){
      $sqlU = "UPDATE tutor SET id_grado_seccion = '$id_grado_s' WHERE id_Tutor='$id_Tutor' ";
      $queryU = mysqli_query($conexion,$sqlU);
    }
    if($id_Tutor==null || $id_Tutor==""){
      $anio = date("Y");
      $sqlR = "INSERT INTO tutor VALUES (NULL,'$anio','$id_personal','$id_grado_s')";
      $queryR = mysqli_query($conexion,$sqlR);
    }
  }else{
      $sqlD = "DELETE FROM tutor WHERE id_Tutor = '$id_Tutor' ";
      $queryR = mysqli_query($conexion,$sqlD);
  }

  if(!$query){
    echo json_encode("0");
  }else{
    echo json_encode("1");
  }


}

