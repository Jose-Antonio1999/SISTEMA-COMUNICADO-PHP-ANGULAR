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

      //datos
      $usuario = utf8_decode("Jose");

      // Instantiation and passing `true` enables exceptions
      $mail = new PHPMailer(true);
      $codigo = "<div style='background:#528BFF; height:auto; width: 100%; border-radius: 10px; margin-top:10px;'>
      <h3 style='color:#FFFF;text-align: center;'>INSTITUCIÓN EDUCATIVA BELEN DE OSMA</h3>
      <p style='color: #FFFF; text-align: justify; margin: 10px;'>Hola 👽 $cuerpo 😎
      </p>
      </div>";

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
          $mail->setFrom($email_personal, $usuario);
          //asignamos un for para el envio de datos
          if(sizeof($listaCorreos)==0){

            $mail->addAddress($para, 'Usted');

          }else{

            for($i = 0; $i < sizeof($listaCorreos); $i++){
              $mail->addAddress($listaCorreos[$i], 'Usted');     // Add a recipient
            }

          }

          $mail->isHTML(true);                                  // Set email format to HTML
          $mail->Subject = $asunto;
          $mail->Body    = $codigo;
          $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

          $mail->send();
          echo json_encode('1');
          } catch (Exception $e) {
              //echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
              echo json_encode('0');
          }



  }


?>
