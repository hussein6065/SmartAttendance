<?php
// get the infomation from zoom with zoom id 
// do compare and mark register.

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
    
    switch ($data->mode) {
        case 'manual':
            $intern->lecture=$data->lecture;
            echo json_encode(array(
                'status'=>$intern->markAttandance($data->student,$data->value)
            ));
            break;
        
        default:
            # code...
            break;
    }