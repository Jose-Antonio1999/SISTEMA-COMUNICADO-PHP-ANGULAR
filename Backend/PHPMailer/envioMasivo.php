<?php

    //permisos
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: *");
    require('conexion.php');

    // Get obtenemos los datos
    $data = file_get_contents("php://input");

    if(isset($data)){

      $correos = json_decode($data);


      //$listacorreos = utf8_encode(mysqli_real_escape_string($conexion,trim($correos->listacorreos)));
      //echo json_encode($correos);
    }

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    //datos
    $usuario = utf8_decode('José Antonio Rojas Cusi');

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$codigo = "<div style='background:#528BFF; height:auto; width: 100%; border-radius: 10px; margin-top:10px;'>
<h3 style='color:#FFFF;text-align: center;'>INSTITUCIÓN EDUCATIVA BELEN DE OSMA</h3>
<p style='color: #FFFF; text-align: justify; margin: 10px;'>Hola 👽, como están todo es un placer estar aquí, les cuento mi vida:
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab tempora ratione dolores aliquam! Impedit, doloremque officia laborum odit nesciunt accusantium
  pariatur officiis quidem. Aperiam dolores sit quas quo ducimus placeat! 😎
</p>
</div>";

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'joseantoniorsystem@gmail.com';                     // SMTP username
    $mail->Password   = '6jarcjoseantoniorojas1999';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    //Recipients
    $mail->setFrom('joseantoniorojas1999@gmail.com', $usuario);
    //asignamos un for para el envio de datos
    for($i = 0; $i < sizeof($correos); $i++){
      $mail->addAddress($correos[$i], 'Apoderado');     // Add a recipient
    }
    //$mail->addAddress('kellykarolanccohuaman@gmail.com');
    //$mail->addAddress('emer03diferex@gmail.com');
    //$mail->addAddress('edisonquispevargas@gmail.com');

    // Attachments
    //para el envio de archivos
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('./img/EPIS.png', 'EPIS.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "Hola Saludos";
    $mail->Body    = $codigo;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo json_encode('Message has been sent');
} catch (Exception $e) {
    echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
}

?>
