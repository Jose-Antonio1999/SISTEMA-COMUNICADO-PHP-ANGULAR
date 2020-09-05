<?php
//permisos
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: *");
require('conexion.php');

//verificacion del codigo
if(isset($_GET['idApoderado'])){
    //obtener el id
    $code = $_GET['idApoderado'];
    //eliminando de la tabla apoderado
    $sql = "DELETE FROM apoderado WHERE id_apoderado = '$code' ";
    $query = mysqli_query($conexion,$sql);

    if(!$query){
      echo json_encode('0');
    }else{
      echo json_encode('1');
    }
}

