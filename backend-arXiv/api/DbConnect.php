<?php
class DbConnect {


	//Deployed Config
    private $server = '204.216.217.67'; 
    private $dbname = 'PHPproject';
	private $port = "25050";
    private $user = 'GerindMeG';
    private $pass = 'NdKAbIPCGE2BclRJvncQxsqPGkwBb2uD+capWLaWdRA';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . '; port=' . $this->port . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage() . "\n";
            echo "Host: " . $this->server . "\n";
            echo "IP Address: " . gethostbyname($this->server) . "\n";
        }
    }

	//Local Config
	// private $server = 'localhost'; 
 //    private $dbname = 'researchdb';
	// private $port = "3306";
 //    private $user = 'root';
 //    private $pass = '';

 //    public function connect() {
 //        try {
 //            $conn = new PDO('mysql:host=' . $this->server . '; port=' . $this->port . ';dbname=' . $this->dbname, $this->user, $this->pass);
 //            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 //            return $conn;
 //        } catch (\Exception $e) {
 //            echo "Database Error: " . $e->getMessage() . "\n";
 //            echo "Host: " . $this->server . "\n";
 //            echo "IP Address: " . gethostbyname($this->server) . "\n";
 //        }
 //    }

}


?>
