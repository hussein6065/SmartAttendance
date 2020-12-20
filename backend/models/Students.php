<?php
class Student{

    private $connection;
    private $table = 'Students';

    public $id;
    public $fName;
    public $lName;
    public $dob;
    public $major;
    public $gender;
    public $yearGroup;
    public $nationality;
    public $ashesiEmail;
    public $phoneNumber;
    public $facialData;
    public $password;
    private $logIn;

    

    public function __construct($db){
        $this->connection=$db;
    }
    public function create(){
        $query = 'INSERT INTO '.$this->table.' (StudentID,FName,LName,DOB,Gender,Nationality,Major,YearGroup,AshesiEmail,PhoneNumber,FacialData) VALUES(:id,:f,:l,:dob,:gen,:nat,:major,:year,:email,:phone,:face)';
        $stmt = $this->connection->prepare($query);

        $stmt->bindparam(':id',$this->id);
        $stmt->bindparam(':f',$this->fName);
        $stmt->bindparam(':l',$this->lName);
        $stmt->bindparam(':dob',$this->dob);
        $stmt->bindparam(':gen',$this->gender);
        $stmt->bindparam(':nat',$this->nationality);
        $stmt->bindparam(':major',$this->major);
        $stmt->bindparam(':year',$this->yearGroup);
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
            $query = 'UPDATE Students SET PasswordC=:pass,Registered=true where AshesiEmail=:email and StudentID=:id';
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
        $query = 'SELECT EXISTS(SELECT * from Students  WHERE AshesiEmail=:email and Registered=1) as state';
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
            'type'=>'student'
        );
        if($this->registered() && $this->logIn){
            return $info;
            }else{
                return array('status'=>"0");
            }
        

    }
    private function getinfomation(){
        $query = 'SELECT StudentID, concat(FName, " ", LName) as student, Major, AshesiEmail from Students  where StudentID=:id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->id);
      
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $info = array(
            'id'=>$StudentID,
            'name'=>$student,
            'major'=>$Major,
            'email'=>$AshesiEmail
            );
        return $info;
    
        
        
    }
    private function verifyID(){
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
    public function verifyEmail(){
        $query = 'SELECT EXISTS(SELECT * from Students  WHERE AshesiEmail=:email) as state';
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
        $query = 'SELECT StudentID,PasswordC from Students WHERE AshesiEmail=:email';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':email',$this->ashesiEmail);
        if($stmt->execute()){
            if($stmt->rowCount()>0){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($row);
            if(password_verify($this->password,$PasswordC)){
                $this->id = $StudentID;
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
        $query = 'SELECT EXISTS(SELECT * from '.$this->table.'  WHERE FName=:f and LName=:l and StudentID =:id and AshesiEmail=:email ) as state';
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
        $query = 'UPDATE '.$this->table.' SET FacialData=:face WHERE StudentID=:id';

        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->id);
        $stmt->bindparam(':face',$this->facialData);

        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    private function getCourses(){
        $query = 'SELECT C.CourseID, C.CourseName, concat(I.FName," ",I.LName) as FI, concat(F.FName," ",F.LName) as Faculty , L.LectureTime,L.ZoomLink,L.ZoomMeetingId,L.ZoomPassword
		FROM Registered_Courses R 
        INNER JOIN Courses C on R.CourseID = C.CourseID
        INNER JOIN Lectures L on C.CourseID = L.CourseID
        INNER JOIN Faculty F on L.FacultyID = F.FacultyID
        INNER JOIN FacultyIntern I on L.FacultyIntern_ID = I.FacultyIntern_ID 
        WHERE R.StudentID =:id GROUP BY C.CourseID' ;

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
                       'zoomlink'=>$ZoomLink
                   );
                   array_push($courses,$course);
               }
               return $courses;
           }
        }
        // printf("Error: %s.\n", $stmt->error);

        return false;

    }
    public function getAttendance($course){
        $query ='SELECT L.NumWeek, L.LectureTime, A.Confirmation, L.Lecture,  L.Id from AttendanceTable A INNER JOIN  Lectures L   on L.Id = A.LectureID  where L.CourseID =:Id and A.StudentID=:student GROUP BY L.Id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':Id',$course);
        $stmt->bindparam(':student',$this->id);
        if($stmt->execute()){
            if($stmt->rowCount()>0){
                $courses = array();
                while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $course = array(
                        'week'=>$NumWeek,
                        'lecture'=>$Lecture,
                        'id'=>$Id,
                        'date' =>$LectureTime,
                        'status'=>$Confirmation
                    );
                    array_push($courses,$course);
                }
                return $courses;
            }
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    private function getOccuredLecture($course){
        $query ='SELECT count(L.CourseID) from Lectures L INNER JOIN AttendanceTable A on L.Id = A.LectureID  where L.CourseID =:Id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$course);
    }
}