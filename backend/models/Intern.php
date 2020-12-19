<?php
class Intern{

    private $connection;
    private $table = 'FacultyIntern';

    public $id;
    public $fName;
    public $lName;
    public $dob;
    public $gender;
    public $nationality;
    public $level;
    public $speciality;
    public $ashesiEmail;
    public $phoneNumber;
    public $facialData;
    public $password;
    private $logIn;


    public $lecture;
    public $courseID;
    public $faculty;


    public function __construct($db){
        $this->connection=$db;
    }
    public function create(){
        $query = 'INSERT INTO '.$this->table.' (FacultyIntern_ID,FName,LName,DOB,Gender,Nationality,Level_of_education,Speciality,AshesiEmail,PhoneNumber,FacialData) VALUES(:id,:f,:l,:dob,:gen,:nat,:level,:spec,:email,:phone,:face)';
        $stmt = $this->connection->prepare($query);

        $stmt->bindparam(':id',$this->id);
        $stmt->bindparam(':f',$this->fName);
        $stmt->bindparam(':l',$this->lName);
        $stmt->bindparam(':dob',$this->dob);
        $stmt->bindparam(':gen',$this->gender);
        $stmt->bindparam(':nat',$this->nationality);
        $stmt->bindparam(':level',$this->level);
        $stmt->bindparam(':spec',$this->speciality);
        $stmt->bindparam(':email',$this->ashesiEmail);
        $stmt->bindparam(':phone',$this->phoneNumber);
        $stmt->bindparam(':face',$this->facialData);
        
        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function registerUser(){
        if(!$this->registered() && $this->verifyEmail()){
            $query = 'UPDATE FacultyIntern SET PasswordC=:pass,Registered=true where AshesiEmail=:email and FacultyIntern_ID=:id';
            $stmt = $this->connection->prepare($query);
            $this->password= password_hash($this->password,PASSWORD_BCRYPT);
            $stmt->bindparam(':pass',$this->password);
            $stmt->bindparam(':email',$this->ashesiEmail);
            $stmt->bindparam(':id',$this->id);
            if($stmt->execute()){
                return true;
            }
            return false;
        }
        return false;
    }
    private function registered(){
        $query = 'SELECT EXISTS(SELECT * from FacultyIntern  WHERE AshesiEmail=:email and Registered=1) as state';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':email',$this->ashesiEmail);
        if($stmt->execute()){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            if($state == '1'){
                return true;
            }
            return false;
        }
    }



    public function userData(){
        $info = array(
            'info'=>$this->getinfomation(),
            'courses'=>$this->getCourses(),
            'status'=>1,
            'type'=>'fi'
        );
        if($this->registered() && $this->logIn){
            return $info;
            }else{
                return array('status'=>"0");
            }
        

    }
    private function getinfomation(){
        $query = 'SELECT FacultyIntern_ID, concat(FName, " ", LName) as fi, AshesiEmail from FacultyIntern  where FacultyIntern_ID=:id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->id);
      
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $info = array(
            'id'=>$FacultyIntern_ID,
            'name'=>$fi,
            'email'=>$AshesiEmail
            );
        return $info;
    
        
        
    }







    public function verifyEmail(){
        $query = 'SELECT EXISTS(SELECT * from '.$this->table.'  WHERE AshesiEmail=:email) as state';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':email',$this->ashesiEmail);
        if($stmt->execute()){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            if($state == '1'){
                return true;
            }
            return false;
        }
    }
    public function verifyPassword(){
        $query = 'SELECT FacultyIntern_ID,PasswordC from FacultyIntern WHERE AshesiEmail=:email';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':email',$this->ashesiEmail);
        if($stmt->execute()){
            if($stmt->rowCount()>0){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            if(password_verify($this->password,$PasswordC)){
                $this->id = $FacultyIntern_ID;
                $this->logIn = true;
                return true;
            }
            return false;
            // return false;
            }
        }
        return false;
    }
    public function verifyInformation(){
        $query = 'SELECT EXISTS(SELECT * from '.$this->table.'  WHERE FName=:f and LName=:l and FacultyID =:id and AshesiEmail=:email ) as state';
        $stmt = $this->connection->prepare($query);

        $stmt->bindparam(':email',$this->ashesiEmail);
        $stmt->bindparam(':f',$this->fName);
        $stmt->bindparam(':l',$this->lName);
        $stmt->bindparam(':id',$this->id);

        if($stmt->execute()){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            if($state == '1'){
                return true;
            }
            return false;
        }
    }

    public function insertFacialData(){
        $query = 'UPDATE '.$this->table.' SET FacialData=:face WHERE FacultyID=:id';

        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->id);
        $stmt->bindparam(':face',$this->facialData);

        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function getCourses(){
        $query = 'SELECT C.CourseID, C.CourseName, concat(I.FName," ",I.LName) as FI,  concat(F.FName," ",F.LName) as Faculty,L.LectureTime,L.ZoomLink,L.ZoomMeetingId,L.ZoomPassword
		FROM Lectures L 
        INNER JOIN Courses C on L.CourseID = C.CourseID
        INNER JOIN Faculty F on L.FacultyID = F.FacultyID
        INNER JOIN FacultyIntern I on L.FacultyIntern_ID = I.FacultyIntern_ID 
        WHERE L.FacultyIntern_ID =:id
        GROUP BY C.CourseID';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->id);
        if($stmt->execute()){
           if($stmt->rowCount()>0){
               $courses = array();
               while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                   extract($row);
                   $course = array(
                    'id'=>$CourseID,
                    'course'=>$CourseName,
                    'date' =>$LectureTime,
                    'fi'=>$FI,
                    'faculty'=>$Faculty,
                    'zoomlink'=>$ZoomLink,
                    'numberOfStudents'=>$this->getNumberOfStudnetsPerCourse($CourseID)
                   );
                   array_push($courses,$course);
               }
               return $courses;
           }
        }
        // printf("Error: %s.\n", $stmt->error);

        return false;

    }
    
    public function setZoomDetails($link=null,$meetingId,$zoomPassword){
        $query = 'UPDATE Lectures SET ZoomLink=:zoom, ZoomMeetingId=:id, ZoomPassword=:pass WHERE CourseID=:course';

        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$meetingId);
        $stmt->bindparam(':zoom',$link);
        $stmt->bindparam(':pass',$zoomPassword);
        $stmt->bindparam(':course',$this->CourseID);

        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function setPassword($pw){
        $query = 'UPDATE Faculty SET PasswordC=:pass, Registered=:bol WHERE FacultyID=:id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->id);
        $stmt->bindparam(':pass',$pw);
        $stmt->bindparam(':bol','TRUE');

        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function getStudentsPreLecture($id){
        $query = "SELECT I.StudentID, A.Confirmation,concat(I.FName,' ',I.LName) as student FROM AttendanceTable A 
        INNER JOIN  Lectures L on A.LectureID = L.Id
        INNER JOIN Courses C on L.CourseID = C.CourseID
        INNER JOIN Students I on A.StudentID = I.StudentID
        WHERE A.LectureID=:id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$id);

        if($stmt->execute()){
            if($stmt->rowCount()>0){
                $courses = array();
                while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $course = array(
                        'student'=>$student,
                        'id'=>$StudentID,
                        'status'=>$Confirmation

                    );
                    array_push($courses,$course);
                }
                return $courses;
            }
        }
        // printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function getLecturesPerCourse(){
        $query = "SELECT L.NumWeek, L.LectureTime, A.Confirmation, L.Lecture, L.Id FROM AttendanceTable A INNER JOIN  Lectures L on A.LectureID = L.Id
        INNER JOIN Courses C on L.CourseID = C.CourseID
        INNER JOIN FacultyIntern I on L.FacultyIntern_ID = I.FacultyIntern_ID
        WHERE L.CourseID=:id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->courseID);

        if($stmt->execute()){
            if($stmt->rowCount()>0){
                $courses = array();
                while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $course = array(
                        'week'=>$NumWeek,
                        'lecture'=>$Lecture,
                        'id'=>$Id,
                        'attendees'=>$this->getNumberOfAttandancePerLecture($Id),
                        'date' =>$LectureTime,
                        'students'=>$this->getStudentsPreLecture($Id)


                    );
                    array_push($courses,$course);
                }
                return $courses;
            }
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

   
   public function getNumberOfStudnetsPerCourse($id){
    $query = "SELECT  Count( StudentID) as num  from Registered_Courses where CourseID=:id";
    $stmt = $this->connection->prepare($query);
    $stmt->bindparam(':id',$id);

    if($stmt->execute()){
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        return$row['num'];
        
    }
    printf("Error: %s.\n", $stmt->error);

    return false;
}
    public function getNumberOfAttandancePerLecture($id){
        $query = "SELECT COUNT(StudentID) as num from AttendanceTable where LectureID=:id and Confirmation = true;
        ";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$id);

        if($stmt->execute()){
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            return$row['num'];
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function markAttandance($student,$value){
        $query = "UPDATE AttendanceTable set Confirmation =:con where StudentID =:student and LectureId =:id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':student',$student);
        $stmt->bindparam(':con',$value);
        $stmt->bindparam(':id',$this->lecture);

        if($stmt->execute()){
            // Extract before you return
            return true;
        }
        // printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function autoMark(){

    }
    private function getFaculty(){
        $query = 'SELECT FacultyID, FacultyIntern_ID from  Registered_Courses where CourseID =:cId Limit 1';
        
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':cId',$this->courseID);
        if($stmt->execute()){
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            $this->id = $FacultyIntern_ID;
            $this->faculty = $FacultyID;
            return true;
        }
    }
    public function scheduleLecture($lecture, $lectureDate,$week,$zoom){
        $this->getFaculty();
        $query = 'INSERT into Lectures (Lecture, LectureTime, CourseID,FacultyID,FacultyIntern_ID,NumWeek,ZoomLink) values (:lec,:ldate,:cId,:fId,:fiId,:numW,:link)';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':lec',$lecture);
        $stmt->bindparam(':ldate',$lectureDate);
        $stmt->bindparam(':cId',$this->courseID);
        $stmt->bindparam(':fId',$this->faculty);
        $stmt->bindparam(':fiId',$this->id);
        $stmt->bindparam(':numW',$week);
        $stmt->bindparam(':link',$zoom);
        if($stmt->execute()){
            // Extract before you return
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
        
    }
    public function getZoomLink(){
        $query ="SELECT ZoomLink , LectureTime from Lectures where CourseID =:cId order by Id DESC  LIMIT 1";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':cId',$this->courseID);
        if($stmt->execute()){
            if($stmt->rowCount()>0){
                
                $row=$stmt->fetch(PDO::FETCH_ASSOC);
                // return $row['ZoomLink'];
                return array('link'=>$row['ZoomLink'],'time'=>$row['LectureTime']);
            }
        }
        // printf("Error: %s.\n", $stmt->error);
        return false;
    }

    private function getStudentIdsPreCourse(){
        $query = "SELECT  StudentID from Registered_Courses where CourseID =:cId order by StudentID";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':cId',$this->courseID);
        if($stmt->execute()){
            if($stmt->rowCount()>0){
                $courses = array();
                while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    array_push($courses,$StudentID);
                }
                return $courses;
            }
        }
        printf("Error: %s.\n", $stmt->error);
        return false;

    }
    private function fillStudent($StudentID,$lecture){
        $query = " INSERT INTO AbsenteeTable(StudentID,LectureID) VALUES(:student,:lec)";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':lec',$lecture);
        $stmt->bindparam(':student',$StudentID);
        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
    public function fillattendanceTable(){
        $students = $this->getStudentIdsPreCourse();
        if(count($students)>0){
            foreach($students as $student){
                $this->fillStudent($student,$this->lecture);
            }
        }


    }
}