<?php

    //permisos
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: *");
    require('conexion.php');

    //Modulo de envio
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    // Get obtenemos los datos
    $data = file_get_contents("php://input");

  if(isset($data)){

      $DATA = json_decode($data);
      $listaCorreos = [];
      //Obteniedo Datos del usuario que envia el mensaje
      $DNI_personal = $DATA[0]->DNI_personal;
      $nombre_personal = $DATA[0]->nombre_personal;
      $apellidoMaterno_personal = $DATA[0]->apellidoMaterno_personal;
      $apellidoPaterno_personal = $DATA[0]->apellidoPaterno_personal;
      $email_personal = $DATA[0]->email_personal;
      $id_personal = $DATA[0]->id_personal;
      $tipoPersonal = $DATA[0]->tipoPersonal;
      //obteniendo datos del mensaje
      $asunto = $DATA[1]->asunto;
      $cuerpo = $DATA[1]->cuerpo;
      $para = $DATA[1]->para;
      $pass = $DATA[1]->pass;
      $tipo = $DATA[1]->tipo;
      //Correo
      $listaCorreos = $DATA[2];

      //Codigo de envio de gmail
      $fechaActual = date('Y-m-d');
      $HoraActual = date('H:i:s');
      //datos
      $Asunto = utf8_decode($asunto);
      $nombre_personal_iso = utf8_decode($nombre_personal);
      // Instantiation and passing `true` enables exceptions
      $mail = new PHPMailer(true);
      $codigo = "<!DOCTYPE html>
      <html lang='es'>
      <head>
          <meta charset='utf-8'>
          <title>Comunicado</title>
      </head>
      <body>
      <table style='max-width: 600px; padding: 10px; margin:0 auto; border: 1px solid #1A70B3;'>
          <tr>
              <td style='text-align: center; padding: 0; display: flex; justify-content: space-between'>
                  <img width='90%' style='margin: 1.5% auto; text-align: left' src='https://i.postimg.cc/ZKJ9xQH3/belen3.png'>
              </td>
          </tr>

          <tr>
              <td style='font-family: Times, serif;'>
                  <h2 style='text-align: center; text-decoration: underline;'>$tipo</h2>
              </td>
          </tr>
          <tr>
              <td>
                  <div style=' text-align: justify;'>
                      <p style='margin: 2px; font-size: 18px; font-family: 'Times New Roman', Times, serif;'>
                        $cuerpo
                      </p>
                  </div>
              </td>
          </tr>
          <tr>
              <td>
                  <p style='float: right;font-size: 18px'>Fecha:, $fechaActual</p>
              </td>
          </tr>
          <tr>
              <td>
                  <p style='text-align: center; font-size: 18px; '>Atentamente:</p>
                  <p style='text-align: center; font-size: 18px; margin-top: 0'>I.E Belén Osma y Pardo - Andahuaylas</p>
                  <hr style='width: 40%; border: 1px solid; text-align: center'>
              </td>
          </tr>
      </table>
      </body>
      </html>";

      try {
          //Server settings
          $mail->SMTPDebug = 0;                      // Enable verbose debug output
          $mail->isSMTP();                                            // Send using SMTP
          $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
          $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
          $mail->Username   = $email_personal;                     // SMTP username
          $mail->Password   = $pass;                               // SMTP password
          $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
          $mail->Port       = 587;                                // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
          //Recipients
          $mail->setFrom($email_personal, $nombre_personal_iso);
          //asignamos un for para el envio de datos
          if(sizeof($listaCorreos)==0){

            $mail->addAddress($para, 'Usuario');

          }else{

            for($i = 0; $i < sizeof($listaCorreos); $i++){
              $mail->addAddress($listaCorreos[$i], 'Usuario');     // Add a recipient
            }

          }

          $mail->isHTML(true);                                  // Set email format to HTML
          $mail->Subject = $Asunto;
          $mail->Body    = $codigo;
          $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();

          //Insertando comunicado a la BD
          $sql = "INSERT INTO comunicado VALUES (NULL,'$asunto', '$fechaActual','$cuerpo','$HoraActual','enviado','$tipo','$id_personal'); ";
          $querys = mysqli_query($conexion,$sql);
          if(!$querys){
            echo json_encode('0');
          }else{
            echo json_encode('1');
          }
          } catch (Exception $e) {
              //echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
              echo json_encode('0');
          }



  }


?>
