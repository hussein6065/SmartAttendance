<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

   
    include_once '../models/Intern.php';
    include_once '../config/Database.php';

   
    $data = json_decode(file_get_contents("php://input"));
    $database = new Database();
    $db = $database->connect();
    $intern = new Intern($db);
    $intern->courseID = $data->course;
    $result = $intern->getZoomLink();
    if(!$result){
        echo json_encode(array('status'=>'0','link'=>$result));
    }else{
        echo json_encode(array('status'=>'1','info'=>$result));
    }
