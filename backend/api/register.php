<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

    include_once '../models/Students.php';
    include_once '../models/Intern.php';
    include_once '../config/Database.php';

    $data = json_decode(file_get_contents("php://input"));
    $database = new Database();
    $db = $database->connect();
    $student = new Student($db);
    $intern = new Intern($db);

    switch ($data->role) {
        case 'student':
            $student->ashesiEmail = $data->email;
            $student->password = $data->password;
            $student->id = $data->id;
            if($student->registerUser()){
                echo json_encode( array('status'=>"1"));
                    return;
            }else{
                echo json_encode(
                    array('status'=>"0")
                );
            }
            break;
        case 'fi':
            $intern->ashesiEmail = $data->email;
            $intern->password = $data->password;
            $intern->id = $data->id;
            if($intern->registerUser()){
                echo json_encode( array('status'=>"1"));
                    return;
            }else{
                echo json_encode(
                    array('status'=>"0")
                );
            }
                break;
        default:
            # code...
            break;
    }