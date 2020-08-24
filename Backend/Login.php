<?php

//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

// Get obtenemos los datos
$data = file_get_contents("php://input");

if(isset($data)){

  $personal = json_decode($data);
  //obtenemos los dartos

  $tipo = mysqli_real_escape_string($conexion,trim($personal->tipo));
  $user = mysqli_real_escape_string($conexion,trim($personal->user));
  $pass = mysqli_real_escape_string($conexion,$personal->pass);

  $lista = [];
  $sql = "SELECT * FROM usuario WHERE Perfil='$tipo' and Correo='$user' and Contrasenia='$pass'";
  $query = mysqli_query($conexion,$sql);
  $i = 0;
  while($filas = mysqli_fetch_array($query)){
    $lista[$i]['Correo'] = $filas['Correo'];
    $lista[$i]['Perfil'] = $filas['Perfil'];
    $i++;
  }
  echo json_encode($lista);

}


