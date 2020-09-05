<?php
//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

//verificacion del codigo
if(isset($_GET['idComunicado'])){
  $code = $_GET['idComunicado'];
  $qsl = "DELETE FROM comunicado WHERE id_Comunicado = '$code'";
  $query = mysqli_query($conexion,$qsl);

  if(!$query){
    echo json_encode('0');
  }else{
    echo json_encode('1');
  }
}
