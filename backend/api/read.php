<?php
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');

    include_once '../config/Database.php';
    include_once '../models/Students.php';
    include_once '../models/Faculty.php';
    include_once '../models/Intern.php';

    $database = new Database();
    $db = $database->connect();

    $student = new Student($db);
    $faculty = new Faculty($db);
    $intern = new Intern($db);
    // $student->table = 'Students';
    $student->id = '60652022';
    $faculty->id = 'ASF95631';
    $intern->id = 'ASFI5681';
    $intern->courseID='CS 222';
    $intern->lecture='1';
    $student->ashesiEmail='hussein.fusei@ashesi.edu.gh';
    
;
    $info = array();
    $info['data']=$intern->getStudentsPreLecture();
    $info['data2']=$intern->getLecturesPerCourse();
    echo json_encode($info);
