<?php
require '../vendor/autoload.php';
use Mailgun\Mailgun;
$mg = new Mailgun("key-5050152406bbc874ab711f56d41e124e");
$domain = "sandboxd7e86cfe736c40d5a29b0e92112a3f6c.mailgun.org";
$email = "dean99dean@qq.com";
$name="Dean";

$mg->sendMessage($domain, array('from'    => 'dian@tangdian.ca', 
                                'to'      => $email, 
                                'subject' => 'Congratulations!  '.$name.',you have successfully reserved a seat!', 
                                'text'    => "Hi,".$name.",\n  this is a confirmation that you reserved a seat at "));

?>