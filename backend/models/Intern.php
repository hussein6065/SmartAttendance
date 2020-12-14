<?php
class Intern{

    private $connection;
    private $table;

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


    public $lecture;
    public $courseID;


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
        printf("Error: %s.\n", $stmt->error);

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
    public function getStudentsPreLecture(){
        $query = "SELECT I.StudentID, A.Confirmation,concat(I.FName,' ',I.LName) as student FROM AttendanceTable A 
        INNER JOIN  Lectures L on A.LectureID = L.Id
        INNER JOIN Courses C on L.CourseID = C.CourseID
        INNER JOIN Students I on A.StudentID = I.StudentID
        WHERE A.LectureID=:id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->lecture);

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
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function getLecturesPerCourse(){
        $query = "SELECT L.NumWeek, A.Confirmation, L.Lecture, L.Id FROM AttendanceTable A INNER JOIN  Lectures L on A.LectureID = L.Id
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
    public function getNumberOfAttandancePerLecture(){
        $query = "SELECT COUNT(StudentID) from AttendanceTable where LectureID=:id and Confirmation = true;
        ";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':id',$this->lecture);

        if($stmt->execute()){
            // Extract before you return
            return $stmt;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function markAttandance($student){
        $query = "UPDATE AttendanceTable set Confirmation = True where StudentID =:student and LectureId =:id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':student',$student);
        $stmt->bindparam(':id',$this->lecture);

        if($stmt->execute()){
            // Extract before you return
            return true;
        }
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
    public function autoMark(){

    }
    public function sheduleLecture($lecture, $lectureDate,$week){
        $query = 'INSERT into Lectures (Lecture, LectureDate, CourseID,FacultyID,FacultyIntern_ID,NumWeek) values (:lec,:ldate,:cId,:fId,:fiId,:numW)';
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':lec',$lecture);
        $stmt->bindparam(':ldate',$lectureDate);
        $stmt->bindparam(':cId',$this->courseID);
        $stmt->bindparam(':fId',$this->id);
        $stmt->bindparam(':fiId',$this->id);
        $stmt->bindparam(':numW',$week);
        if($stmt->execute()){
            // Extract before you return
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
        return false;
        
    }
    public function getZoomLink(){
        $query ="SELECT ZoomLink from Lectures where CourseID =:cId order by Id DESC";
        $stmt = $this->connection->prepare($query);
        $stmt->bindparam(':cId',$this->courseID);
        if($stmt->execute()){
            // Extract before you return
            return true;
        }
        printf("Error: %s.\n", $stmt->error);
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