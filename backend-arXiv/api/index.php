<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,DELETE");
header("Access-Control-Allow-Credentials: true");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// echo json_encode($conn ? 'Connected' : 'Failed');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        // Check if the user is logged in by checking the session
        if (isset($_SESSION['user'])) {
            $response = ['loggedIn' => true, 'user' => $_SESSION['user']];
        } else {
            $response = ['loggedIn' => false];
        }
        echo json_encode($response);
        break;
        // Add this case under your switch statement for handling POST requests
    case "POST":
        file_put_contents('debug.txt', file_get_contents('php://input'));

        $user = json_decode(file_get_contents('php://input'));

        if (isset($user->action)) {
            switch ($user->action) {
                case 'register':
                    // Validate input (add more validation as needed)
                    if (empty($user->username) || empty($user->password) || empty($user->email)) {
                        $response = ['status' => 0, 'message' => 'Please fill in all fields.'];
                        echo json_encode($response);
                        break;
                    }

                    // Check if the username or email is already registered
                    $checkUserSql = "SELECT * FROM users WHERE username = :username OR email = :email";
                    $checkUserStmt = $conn->prepare($checkUserSql);
                    $checkUserStmt->bindParam(':username', $user->username);
                    $checkUserStmt->bindParam(':email', $user->email);
                    $checkUserStmt->execute();

                    if ($checkUserStmt->rowCount() > 0) {
                        $response = ['status' => 0, 'message' => 'Username or email already exists.'];
                        echo json_encode($response);
                        break;
                    }

                    // Hash the password securely
                    $hashedPassword = password_hash($user->password, PASSWORD_BCRYPT);

                    // Insert the new user
                    $insertUserSql = "INSERT INTO users (username, password, email) VALUES (:username, :password, :email)";
                    $insertUserStmt = $conn->prepare($insertUserSql);
                    $insertUserStmt->bindParam(':username', $user->username);
                    $insertUserStmt->bindParam(':password', $hashedPassword);
                    $insertUserStmt->bindParam(':email', $user->email);

                    if ($insertUserStmt->execute()) {
                        // Fetch the inserted user information
                        $userId = $conn->lastInsertId();
                        $selectUserSql = "SELECT UserID, Username, Email, Avatar, IsAdmin, IsSuperuser FROM users WHERE userID = :id";
                        $selectUserStmt = $conn->prepare($selectUserSql);
                        $selectUserStmt->bindParam(':id', $userId);
                        $selectUserStmt->execute();
                        $registeredUser = $selectUserStmt->fetch(PDO::FETCH_ASSOC);
                        // Start the session and store user data in the session
                        $_SESSION['user'] =  $registeredUser;

                        $response = ['status' => 1, 'message' => 'User registered successfully.', 'user' => $registeredUser];
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to register user.'];
                    }

                    echo json_encode($response);
                    break;


                case 'login':
                    // Validate input
                    if (empty($user->username) || empty($user->password)) {
                        $response = ['status' => 0, 'message' => 'Please enter username and password.'];
                        echo json_encode($response);
                        break;
                    }

                    // Retrieve user by username
                    $getUserSql = "SELECT * FROM users WHERE username = :username";
                    $getUserStmt = $conn->prepare($getUserSql);
                    $getUserStmt->bindParam(':username', $user->username);
                    $getUserStmt->execute();

                    if ($getUserStmt->rowCount() > 0) {
                        $userData = $getUserStmt->fetch(PDO::FETCH_ASSOC);

                        // Check if the entered password matches the stored hashed password
                        if (password_verify($user->password, $userData['Password'])) {
                            // Remove the password from the user data before sending it in the response
                            unset($userData['Password']);
                            // Start the session and store user data in the session
                            $_SESSION['user'] = $userData;

                            $response = ['status' => 1, 'message' => 'Login successful.', 'user' => $userData];
                        } else {
                            $response = ['status' => 0, 'message' => 'Incorrect password.'];
                        }
                    } else {
                        $response = ['status' => 0, 'message' => 'User not found.'];
                    }

                    echo json_encode($response);
                    break;


                default:
                    $response = ['status' => 0, 'message' => 'Invalid action.'];
                    echo json_encode($response);
                    break;
            }
        }
        break;
    case "DELETE":
        // Log the user out by destroying the session
        session_destroy();
        $response = ['status' => 1, 'message' => 'Logged out successfully.'];
        echo json_encode($response);
        break;

    default:
        echo json_encode(['error' => 'Invalid request method.']);
        break;
}


//         if(isset($path[3]) && is_numeric($path[3])) {
//             $sql .= " WHERE id = :id";
//             $stmt = $conn->prepare($sql);
//             $stmt->bindParam(':id', $path[3]);
//             $stmt->execute();
//             $users = $stmt->fetch(PDO::FETCH_ASSOC);
//         } else {
//             $stmt = $conn->prepare($sql);
//             $stmt->execute();
//             $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         }

//         echo json_encode($users);
//         break;
//     case "POST":
//         $user = json_decode( file_get_contents('php://input') );
//         $sql = "INSERT INTO users(id, name, email, mobile, created_at) VALUES(null, :name, :email, :mobile, :created_at)";
//         $stmt = $conn->prepare($sql);
//         $created_at = date('Y-m-d');
//         $stmt->bindParam(':name', $user->name);
//         $stmt->bindParam(':email', $user->email);
//         $stmt->bindParam(':mobile', $user->mobile);
//         $stmt->bindParam(':created_at', $created_at);

//         if($stmt->execute()) {
//             $response = ['status' => 1, 'message' => 'Record created successfully.'];
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to create record.'];
//         }
//         echo json_encode($response);
//         break;

//     case "PUT":
//         $user = json_decode( file_get_contents('php://input') );
//         $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
//         $stmt = $conn->prepare($sql);
//         $updated_at = date('Y-m-d');
//         $stmt->bindParam(':id', $user->id);
//         $stmt->bindParam(':name', $user->name);
//         $stmt->bindParam(':email', $user->email);
//         $stmt->bindParam(':mobile', $user->mobile);
//         $stmt->bindParam(':updated_at', $updated_at);

//         if($stmt->execute()) {
//             $response = ['status' => 1, 'message' => 'Record updated successfully.'];
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to update record.'];
//         }
//         echo json_encode($response);
//         break;

//     case "DELETE":
//         $sql = "DELETE FROM users WHERE id = :id";
//         $path = explode('/', $_SERVER['REQUEST_URI']);

//         $stmt = $conn->prepare($sql);
//         $stmt->bindParam(':id', $path[3]);

//         if($stmt->execute()) {
//             $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to delete record.'];
//         }
//         echo json_encode($response);
//         break;
// }