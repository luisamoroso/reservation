<!DOCTYPE html>
<html>
<body>
<h1>Coming soon...</h1>

<?php
$empfaenger = 'emmanuelaR@gmx.net';
$betreff = 'Meine Porto Elia Reservierung';
$nachricht = 'Reservation ok';
$header = array(
    'From' => 'info@porto-elia.de',
    'Reply-To' => 'info@porto-elia.de',
    'X-Mailer' => 'PHP/' . phpversion()
);

// mail($empfaenger, $betreff, $nachricht, $header);
?>

<?php 
  
// PHP function to print a  
// random string of length n 
function RandomStringGenerator($n) 
{ 
    // Variable which store final string 
    $generated_string = ""; 
      
    // Create a string with the help of  
    // small letters, capital letters and 
    // digits. 
    $domain = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; 
      
    // Find the length of created string 
    $len = strlen($domain); 
      
    // Loop to create random string 
    for ($i = 0; $i < $n; $i++) 
    { 
        // Generate a random index to pick 
        // characters 
        $index = rand(0, $len - 1); 
          
        // Concatenating the character  
        // in resultant string 
        $generated_string = $generated_string . $domain[$index]; 
    } 
      
    // Return the random generated string 
    return $generated_string; 
} 
  
// Driver code to test above function 
$n = 5; 
echo "Random String of length " . $n 
   . " = " . RandomStringGenerator($n); 
?> 

</body>
</html>