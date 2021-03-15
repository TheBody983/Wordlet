<?php
// Charge et initialise les bibliothèques globales
require_once 'controllers.php';

//Démarrage de la session
session_start();

//RECUPERE L'URL ET LE COUPE EN MORCEAUX AU NIVEAU DE '/'
$action = explode('/',parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
//PREND LE DERNIER MORCEAU DE $URI SOIT LE PARAMETRE
$action = end($action);

main_action();