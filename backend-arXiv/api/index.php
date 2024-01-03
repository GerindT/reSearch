<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: https://arxiv-frontend.netlify.app");
header("Access-Control-Allow-Headers: Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,DELETE");
header("Access-Control-Allow-Credentials: true");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// echo json_encode($conn ? 'Connected' : 'Failed');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
        // Add a GET request to get all categories
    case "GET":
        $getCategoriesSql = "SELECT * FROM categories";
        $getCategoriesStmt = $conn->prepare($getCategoriesSql);
        $getCategoriesStmt->execute();
        $categories = $getCategoriesStmt->fetchAll(PDO::FETCH_ASSOC);
        // Check if the user is logged in by checking the session
        if (isset($_SESSION['user'])) {
            $loggedInUser = $_SESSION['user'];

            // Your logic to retrieve categories from the database
            $response = ['loggedIn' => true, 'user' => $loggedInUser, 'categories' => $categories];
        } else {
            $response = ['loggedIn' => false, 'categories' => $categories];
        }
        echo json_encode($response);
        break;

        // Add this case under your switch statement for handling POST requests
    case "POST":

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
        } elseif ($_POST['action'] == 'update') {


            if (!isset($_SESSION['user'])) {
                $response = ['status' => 0, 'message' => 'User not logged in.'];
                echo json_encode($response);
                break;
            }

            // Get the user data from the session
            $loggedInUser = $_SESSION['user'];

            // Check if the user ID from the session matches the ID in the request
            if ($loggedInUser['UserID'] != $_POST['id']) {
                $response = ['status' => 0, 'message' => 'Invalid user ID for update.'];
                echo json_encode($response);
                break;
            }

            // Update the user information based on the provided fields
            $updateFields = [];

            if (!empty($_POST['username'])) {
                // Check if the new username is already registered by another user
                $checkUserSql = "SELECT * FROM users WHERE username = :username AND UserID != :id";
                $checkUserStmt = $conn->prepare($checkUserSql);
                $checkUserStmt->bindParam(':username', $_POST['username']);
                $checkUserStmt->bindParam(':id', $_POST['id']);
                $checkUserStmt->execute();

                if ($checkUserStmt->rowCount() > 0) {
                    $response = ['status' => 0, 'message' => 'Username already exists.'];
                    echo json_encode($response);
                    break;
                }

                $updateFields[] = 'username = :username';
            }

            if (!empty($_POST['email'])) {
                // Check if the new email is already registered by another user
                $checkUserSql = "SELECT * FROM users WHERE email = :email AND UserID != :id";
                $checkUserStmt = $conn->prepare($checkUserSql);
                $checkUserStmt->bindParam(':email', $_POST['email']);
                $checkUserStmt->bindParam(':id', $_POST['id']);
                $checkUserStmt->execute();

                if ($checkUserStmt->rowCount() > 0) {
                    $response = ['status' => 0, 'message' => 'Email already exists.'];
                    echo json_encode($response);
                    break;
                }

                $updateFields[] = 'email = :email';
            }

            // Check if the new password is different from the current one
            if (!empty($_POST['password'])) {
                $checkPasswordSql = "SELECT Password FROM users WHERE UserID = :id";
                $checkPasswordStmt = $conn->prepare($checkPasswordSql);
                $checkPasswordStmt->bindParam(':id', $_POST['id']);
                $checkPasswordStmt->execute();
                $currentPasswordHash = $checkPasswordStmt->fetchColumn();

                if (password_verify($_POST['password'], $currentPasswordHash)) {
                    $response = ['status' => 0, 'message' => 'Password cannot be the same.'];
                    echo json_encode($response);
                    break;
                }

                // Hash the new password securely
                $hashedPassword = password_hash($_POST['password'], PASSWORD_BCRYPT);
                $updateFields[] = 'password = :password';
            }


            if (!empty($_FILES['avatar']['name'])) {
                // Handle avatar upload
                $uploadDir = 'img/';
                $avatarName = basename($_FILES['avatar']['name']);
                $avatarPath = $uploadDir . $avatarName;

                if (move_uploaded_file($_FILES['avatar']['tmp_name'], $avatarPath)) {
                    // Update the avatar path in the database
                    $updateFields[] = 'avatar = :avatar';
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to upload avatar.'];
                    echo json_encode($response);
                    break;
                }
            }

            if (empty($updateFields)) {
                $response = ['status' => 0, 'message' => 'No fields to update.'];
                echo json_encode($response);
                break;
            }

            // Construct the update query
            $updateUserSql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE UserID = :id";
            $updateUserStmt = $conn->prepare($updateUserSql);

            // Bind parameters based on the provided fields
            if (!empty($_POST['username'])) {
                $updateUserStmt->bindParam(':username', $_POST['username']);
            }

            if (!empty($_POST['email'])) {
                $updateUserStmt->bindParam(':email', $_POST['email']);
            }

            if (!empty($_POST['password'])) {
                $updateUserStmt->bindParam(':password', $hashedPassword);
            }

            if (!empty($_FILES['avatar']['name'])) {
                $updateUserStmt->bindParam(':avatar', $avatarPath);
            }

            $updateUserStmt->bindParam(':id', $_POST['id']);

            // Execute the update query
            if ($updateUserStmt->execute()) {
                // Update the user data in the session for the modified fields
                if (!empty($_POST['username'])) {
                    $_SESSION['user']['Username'] = $_POST['username'];
                }

                if (!empty($_POST['email'])) {
                    $_SESSION['user']['Email'] = $_POST['email'];
                }

                if (!empty($_FILES['avatar']['name'])) {
                    // Instead of storing the avatar path, store it as a URL
                    $_SESSION['user']['Avatar'] = $avatarPath;
                }

                // No need to update the password in the session as these are usually not retrieved on login

                $response = ['status' => 1, 'message' => 'User updated successfully.', 'user' => $_SESSION['user']];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update user.'];
            }

            echo json_encode($response);
            break;
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
