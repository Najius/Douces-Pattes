<?php
/**
 * Douces Pattes - Traitement du formulaire de contact
 * Ce script envoie les messages du formulaire par email
 */

// Configuration
$to_email = "contact@doucespattes.fr"; // À MODIFIER avec votre vrai email
$redirect_success = "/merci.html";
$redirect_error = "/index.html#contact";

// En-têtes de sécurité
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Vérifier que c'est une requête POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("Méthode non autorisée");
}

// Protection CSRF basique (vérification du référent)
$allowed_domains = ['doucespattes.fr', 'www.doucespattes.fr'];
$referer = isset($_SERVER['HTTP_REFERER']) ? parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) : '';

if (!in_array($referer, $allowed_domains) && !empty($referer)) {
    http_response_code(403);
    die("Accès refusé");
}

// Récupération et validation des données
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Honeypot anti-spam (champ caché)
$honeypot = isset($_POST['website']) ? $_POST['website'] : '';
if (!empty($honeypot)) {
    // Si le champ honeypot est rempli, c'est probablement un bot
    header("Location: $redirect_success");
    exit;
}

// Validation des champs obligatoires
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = "Le nom est requis (minimum 2 caractères)";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "L'email est invalide";
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = "Le message est requis (minimum 10 caractères)";
}

// Si des erreurs, rediriger avec message
if (!empty($errors)) {
    $error_msg = urlencode(implode(". ", $errors));
    header("Location: $redirect_error&error=$error_msg");
    exit;
}

// Nettoyage des données
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Limitation de la longueur
$name = substr($name, 0, 100);
$message = substr($message, 0, 2000);

// Préparation de l'email
$subject = "Nouveau message depuis doucespattes.fr - " . $name;

$email_body = "Vous avez reçu un nouveau message depuis le formulaire de contact de Douces Pattes.\n\n";
$email_body .= "===================================\n";
$email_body .= "INFORMATIONS DE CONTACT\n";
$email_body .= "===================================\n\n";
$email_body .= "Nom : " . $name . "\n";
$email_body .= "Email : " . $email . "\n";
$email_body .= "Téléphone : " . (!empty($phone) ? $phone : "Non renseigné") . "\n";
$email_body .= "Date : " . date('d/m/Y à H:i') . "\n\n";
$email_body .= "===================================\n";
$email_body .= "MESSAGE\n";
$email_body .= "===================================\n\n";
$email_body .= $message . "\n\n";
$email_body .= "===================================\n";
$email_body .= "Informations techniques\n";
$email_body .= "===================================\n";
$email_body .= "IP : " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "User Agent : " . $_SERVER['HTTP_USER_AGENT'] . "\n";

// En-têtes de l'email
$headers = [];
$headers[] = "From: noreply@doucespattes.fr";
$headers[] = "Reply-To: " . $email;
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Envoi de l'email
$mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));

// Redirection selon le résultat
if ($mail_sent) {
    // Succès - redirection vers la page de remerciement
    header("Location: $redirect_success");
    exit;
} else {
    // Erreur - log de l'erreur et redirection
    error_log("Erreur d'envoi email depuis doucespattes.fr - Email: $email");
    $error_msg = urlencode("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
    header("Location: $redirect_error&error=$error_msg");
    exit;
}
?>
