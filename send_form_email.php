<?php
if(isset($_POST['email'])) {
  $email_to = "as.card.mx@gmail.com";
  $email_subject = "Contacto desde Web";

  function died($error) {
    // mensajes de error
    echo '<script language="javascript">';
    echo 'alert("Ocurrió un error con sus datos, inténtelo de nuevo.");';
    echo '</script>';
    die();
  }
    // Se valida que los campos del formulairo estén llenos

    if(!isset($_POST['first_name']) ||
       !isset($_POST['last_name']) ||
       !isset($_POST['email']) ||
       !isset($_POST['telephone']) ||
       !isset($_POST['message'])) {

        echo '<script language="javascript">';
        echo 'alert("Algunos campos parecen estar vacíos, inténtalo de nuevo");';
        echo '</script>';
        die();
    }
  // En esta parte el valor "name"  sirve para crear las variables que
  // recolectaran la información de cada campo

  $first_name = $_POST['first_name']; // requerido
  $last_name = $_POST['last_name']; // requerido
  $email_from = $_POST['email']; // requerido
  $telephone = $_POST['telephone']; // no requerido
  $message = $_POST['message']; // requerido
  $error_message = "";

  //En esta parte se verifica que la dirección de correo sea válida

  $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'La dirección de correo proporcionada no\ es válida.<br />';
  }

  //En esta parte se validan las cadenas de texto

  $string_exp = "/^[A-Za-z .'-]+$/";

  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'El formato del nombre no es válido<br />';
  }

  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'el formato del apellido no es válido.<br />';
  }

  if(strlen($message) < 2) {
    $error_message .= 'El formato del texto no es válido.<br />';
  }

  if(strlen($error_message) > 0) {
    die($error_message);
  }

  //Este es el cuerpo del mensaje tal y como llegará al correo

  $email_message = "Contenido del Mensaje.\n\n";

  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

    $email_message .= "Nombre: ".clean_string($first_name)."\n";
    $email_message .= "Apellido: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Teléfono: ".clean_string($telephone)."\n";
    $email_message .= "Mensaje: ".clean_string($message)."\n";
    //Se crean los encabezados del correo

    $headers = 'From: '.$email_from."\r\n".
             'Reply-To: '.$email_from."\r\n" .
             'X-Mailer: PHP/' . phpversion();

    @mail($email_to, $email_subject, $email_message, $headers);

    echo '<script language="javascript">';
    echo 'alert("Algunos campos parecen estar vacíos, inténtalo de nuevo");';
    echo '</script>';
?>

<?php } ?>
