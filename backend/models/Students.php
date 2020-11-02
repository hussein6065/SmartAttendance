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
    public function getinfomation($pd){
        
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

    public function getCourses(){
        $query = 'SELECT C.CourseID, C.CourseName, concat(I.FName," ",I.LName) as FI, concat(F.FName," ",F.LName) as Faculty , L.TimeGMT,L.ZoomLink,L.ZoomMeetingId,L.ZoomPassword
		FROM Registered_Courses R 
        INNER JOIN Lectures L on R.CourseID = L.CourseID
        INNER JOIN Courses C on L.CourseID = C.CourseID
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
    private function getAttendace($course){
        $query ='SELEct count(L.CourseID) from Lectures L INNER JOIN AttendanceTable A on L.Id = A.LectureID  where L.CourseID =:Id and A.StudentID=:student';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$course);
        $stmt->bindparam(':studentID',$this->Id);
    }
    private function getOccuredLecture($course){
        $query ='SELEct count(L.CourseID) from Lectures L INNER JOIN AttendanceTable A on L.Id = A.LectureID  where L.CourseID =:Id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$course);
    }
}