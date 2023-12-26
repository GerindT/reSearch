<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = 'https://mysql-test-y8dd.onrender.com';
		private $dbname = 'test';
		private $user = 'testuser';
		private $pass = 'test';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>