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
   switch ($data->user) {
       case 'student':
            $intern->id = $data->student;
            $attend = $intern ->fillStudent();
            if(!($result || $attend) ){
                echo json_encode(array('status'=>'0','link'=>$result));
            }else{
                echo json_encode(array('status'=>'1','info'=>$result));
            }
           break;
       
       default:
            echo json_encode(array('status'=>'1','info'=>$result));
           break;
   }
    
    // if($data->student!==null){
        
    //     echo json_encode(array('status'=>'1','info'=>$intern ->fillStudent()));
    // }else{
    //     echo json_encode(array('status'=>'1','info'=>$data));
    // }

   