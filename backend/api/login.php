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
            if($student->verifyEmail() && $student->verifyPassword()){
                echo json_encode($student->userData());
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
            if($intern->verifyEmail() && $intern->verifyPassword()){
                echo json_encode($intern->userData());
                    return;
            }else{
                echo json_encode(
                    array('status'=>"0")
                );
            }
                break;
        default:
        echo json_encode(
            array('status'=>"699")
        );
            break;
    }