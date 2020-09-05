<?php
//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

//verificacion del codigo
if(isset($_GET['idPersonal'])){

    //obtener el id
    $code = $_GET['idPersonal'];
    $user = '';
    //eliminando de la tabla usuarios
    $sqlu = "SELECT DNI_personal FROM personal WHERE id_personal = '$code' ";
    $query = mysqli_query($conexion,$sqlu);

    while($fil = mysqli_fetch_array($query)){
      $user = $fil['DNI_personal'];
    }

    $sqlDelete = "DELETE FROM usuario WHERE Correo='$user'; ";
    $querys = mysqli_query($conexion,$sqlDelete);

    //eliminar de la tabla principal
    $qsl = "DELETE FROM personal WHERE id_personal = '$code'; ";
    $queryr = mysqli_query($conexion,$qsl);

    if(!$queryr){
      echo json_encode('0');
    }else{
      echo json_encode('1');
    }
}

