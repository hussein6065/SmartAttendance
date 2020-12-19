<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

   
    include_once '../models/Intern.php';

    include_once '../config/Database.php';

    $database = new Database();
    $db = $database->connect();
    $intern = new Intern($db);
    $data = json_decode(file_get_contents("php://input"));
   
    $intern->courseID = $data->course;
    $result = $intern->scheduleLecture($data->lecture,$data->time,$data->week,$data->zoom);
    echo json_encode(array("status"=>$result));