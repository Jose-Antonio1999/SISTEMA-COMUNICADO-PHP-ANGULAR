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

  if(!$query){
    echo json_encode("0");
  }else{
    echo json_encode("1");
  }



}

