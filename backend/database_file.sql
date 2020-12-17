
-- USE HBF60652022;
DROP SCHEMA IF EXISTS HBF606520222;
CREATE SCHEMA HBF606520222;

USE HBF606520222;

CREATE TABLE Students(
	StudentID INT UNSIGNED PRIMARY KEY,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    DOB DATE,
    Gender enum('M','F','O'),
    Nationality VARCHAR(50),
    Major VARCHAR(50) NOT NULL,
    YearGroup YEAR NOT NULL,
    AshesiEmail VARCHAR(100)  UNIQUE NOT NULL,
    nonAshesiEmail VARCHAR(70) UNIQUE,
    PhoneNumber VARCHAR(20) NOT NULL,
    FacialData VARCHAR(100),
    PasswordC VARCHAR(100) DEFAULT NULL,
    Registered BOOLEAN DEFAULT FALSE
    );
    


CREATE TABLE Departments(
	DepartmentCode VARCHAR(10) PRIMARY KEY,
    DepartmentName VARCHAR(50) NOT NULL
    );
    

    
CREATE TABLE Courses(
	CourseID VARCHAR(10) PRIMARY KEY,
    DepartmentCode VARCHAR(10) NOT NULL,
    CourseName VARCHAR(50) NOT NULL,
    Credit enum('Full', 'Half'),
    CreditHours DECIMAL(5,1),
    FOREIGN KEY(DepartmentCode) REFERENCES Departments(DepartmentCode)
    );

-- getting courses tot by a lecturer



CREATE TABLE Faculty(
	FacultyID VARCHAR(10) PRIMARY KEY,
    SSN VARCHAR(20) UNIQUE,
    DepartmentCode VARCHAR(10) NOT NULL,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    DOB DATE,
    Gender enum('M','F','O'),
    Nationality VARCHAR(50),
    Level_of_Education VARCHAR(50),
    Speciality VARCHAR(70),
    Role enum('FULLTIME', 'ADJUNCT'),
    AshesiEmail VARCHAR(70) UNIQUE NOT NULL,
    nonAshesiEmail VARCHAR(70) UNIQUE,
    PhoneNumber VARCHAR(20),
    FacialData VARCHAR(100) UNIQUE,
    PasswordC VARCHAR(100) DEFAULT NULL,
    Registered BOOLEAN DEFAULT FALSE,
    FOREIGN KEY(DepartmentCode) REFERENCEs Departments(DepartmentCode)
    );


CREATE TABLE Department_HOD(
	HOD_Date DATETIME DEFAULT NOW(),
	DepartmentCode VARCHAR(10) NOT NULL,
    FacultyID VARCHAR(10) NOT NULL,
    FOREIGN KEY (DepartmentCode) REFERENCES Departments(DepartmentCode),
    FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID)
	);
       

    
CREATE TABLE FacultyIntern(
	FacultyIntern_ID VARCHAR(10) PRIMARY KEY,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    DOB DATE,
    Gender enum('M','F','O'),
    Nationality VARCHAR(50),
    Level_of_Education VARCHAR(50),
    Speciality VARCHAR(70),
    AshesiEmail VARCHAR(70) UNIQUE NOT NULL,
    nonAshesiEmail VARCHAR(70) UNIQUE ,
    PhoneNumber VARCHAR(20),
    FacialData VARCHAR(100) UNIQUE NOT NULL,
    PasswordC VARCHAR(100) DEFAULT NULL,
    Registered BOOLEAN DEFAULT FALSE
    );




CREATE TABLE Registered_Courses(
	RegistrationID BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	StudentID INT UNSIGNED NOT NULL,
    CourseID VARCHAR(10) NOT NULL,
    FacultyID VARCHAR(10) NOT NULL,
    FacultyIntern_ID VARCHAR(10) NOT NULL,
	Registered_Date DATETIME DEFAULT NOW(), 
    FOREIGN KEY (StudentID) REFERENCES Students (StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID),
    FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID),
    FOREIGN KEY (FacultyIntern_ID) REFERENCES FacultyIntern (FacultyIntern_ID)
	);





    
CREATE TABLE Lectures(
	Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Lecture VARCHAR(100),
    LectureDate DATETIME,
    LectureTime INT(11),
    CourseID VARCHAR(10)NOT NULL,
    FacultyID VARCHAR(10) NOT NULL,
    FacultyIntern_ID VARCHAR(10) NOT NULL,
    NumWeek int unsigned,
    ZoomLink VARCHAR(100),
    ZoomMeetingId INT UNSIGNED,
    ZoomPassword VARCHAR(100),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID),
    FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID),
    FOREIGN KEY (FacultyIntern_ID) REFERENCES FacultyIntern (FacultyIntern_ID)
	);
    

CREATE TABLE AttendanceTable(
	AttendanceID BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	StudentID INT UNSIGNED NOT NULL,
    LectureID BIGINT UNSIGNED NOT NULL,
	AttendanceDate DATETIME DEFAULT NOW(),
    Confirmation BOOLEAN DEFAULT FALSE,
    ReasonIfAbsent BOOLEAN DEFAULT false,
	FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (LectureID) REFERENCES Lectures(Id)
    );
    


