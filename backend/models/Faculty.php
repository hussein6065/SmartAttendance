<?php
class Faculty{

    private $connection;
    private $table;

    public $id;
    public $ssn;
    public $department;
    public $fName;
    public $lName;
    public $dob;
    public $gender;
    public $nationality;
    public $level;
    public $speciality;
    public $role;
    public $ashesiEmail;
    public $phoneNumber;
    public $facialData;


    public function __construct($db){
        $this->connection=$db;
    }
    public function create(){
        $query = 'INSERT INTO '.$this->table.' (FacultyID,SSN,DepartmentCode,FName,LName,DOB,Gender,Nationality,Level_of_education,Speciality,Role,AshesiEmail,PhoneNumber,FacialData) VALUES(:id,:ssn,:depart,:f,:l,:dob,:gen,:nat,:level,:spec,:role,:email,:phone,:face)';
        $stmt = $this->connection->prepare($query);

        $stmt->bindparam(':id',$this->id);
        $stmt->bindparam(':ssn',$this->ssn);
        $stmt->bindparam(':depart',$this->department);
        $stmt->bindparam(':f',$this->fName);
        $stmt->bindparam(':l',$this->lName);
        $stmt->bindparam(':dob',$this->dob);
        $stmt->bindparam(':gen',$this->gender);
        $stmt->bindparam(':nat',$this->nationality);
        $stmt->bindparam(':level',$this->level);
        $stmt->bindparam(':spec',$this->speciality);
        $stmt->bindparam(':role',$this->role);
        $stmt->bindparam(':email',$this->ashesiEmail);
        $stmt->bindparam(':phone',$this->phoneNumber);
        $stmt->bindparam(':face',$this->facialData);
        
        if($stmt->execute()){
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;



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
        $query = 'SELECT C.CourseID, C.CourseName, concat(I.FName," ",I.LName) as FI,  concat(F.FName," ",F.LName) as Faculty,L.TimeGMT,L.ZoomLink,L.ZoomMeetingId,L.ZoomPassword
		FROM Lectures L 
        INNER JOIN Courses C on L.CourseID = C.CourseID
        INNER JOIN Faculty F on L.FacultyID = F.FacultyID
        INNER JOIN FacultyIntern I on L.FacultyIntern_ID = I.FacultyIntern_ID 
        WHERE L.FacultyID =:id
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
                       'fi'=>$FI,
                       'faculty'=>$Faculty,
                       'time'=>$TimeGMT,
                       'zoomlink'=>$ZoomLink,
                       'zoomMeetingId'=>$ZoomMeetingId,
                       'zoomPassword'=>$ZoomPassword
                   );
                   array_push($courses,$course);
               }
               return $courses;
           }
        }
        // printf("Error: %s.\n", $stmt->error);

        return false;

    }
    
    public function setZoomDetails($course,$link=null,$meetingId,$zoomPassword){
        $query = 'UPDATE Lectures SET ZoomLink=:zoom, ZoomMeetingId=:id, ZoomPassword=:pass WHERE CourseID=:course';

        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$meetingId);
        $stmt->bindparam(':zoom',$link);
        $stmt->bindparam(':pass',$zoomPassword);
        $stmt->bindparam(':course',$course);

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
        printf("Error: $s.\n", $stmt->error);

        return false;
    }
}