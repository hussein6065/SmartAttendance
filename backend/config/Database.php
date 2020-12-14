<?php
    class Database{
        private $host = 'localhost';
        private $db_name = 'HBF606520222';
        private $username = 'root';
        private $password = '';
        private $conn;
        
        public function connect(){
            $this->conn = null;
            $arg = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name;
            try {
                $this->conn = new PDO($arg,$this->username,$this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo 'Connection Error: '.$e->getMessage();
            }
            return $this->conn;
        }
    }