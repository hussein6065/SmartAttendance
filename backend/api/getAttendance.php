<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

   
    include_once '../models/Intern.php';
    include_once '../models/Students.php';
    include_once '../config/Database.php';

   
    $data = json_decode(file_get_contents("php://input"));
   
    $database = new Database();
    $db = $database->connect();
    $intern = new Intern($db);
    $student = new Student($db);
    // echo json_encode(array('status'=> $data->type));
    $intern->courseID = $data->course;
    
    // echo json_encode(array('data'=>$data));
    switch ($data->type) {
        case 'course':
            $intern->courseID = $data->course;
            echo json_encode($intern->getLecturesPerCourse());
            break;
        case 'lecture':
            // $intern->lecture = $data->lecture;
            echo json_encode($intern->getStudentsPreLecture($data->lecture));
                break;
        case 'lectures':
            $student->id = $data->id;
            
            echo json_encode($student->getAttendance($data->course));
            
                break;
        default:
            # code...
            break;
    }
    