<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: https://arxiv-frontend.netlify.app");
header("Access-Control-Allow-Headers: Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,DELETE");
header("Access-Control-Allow-Credentials: true");


// Set the SameSite attribute to None for the session cookie
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true, // Only send the cookie over HTTPS
]);

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
        // Add a GET request to get all categories
    case "GET":
        $getAllUsersSQL = "SELECT
                                u.UserID,
                                u.Username,
                                u.Email,
                                u.Avatar,
                                u.IsAdmin,
                                u.IsSuperuser,
                                CONCAT(
                                    '[',
                                    GROUP_CONCAT(
                                        DISTINCT CONCAT(
                                            '{\"CategoryName\":\"', c.CategoryName, '\",\"CategoryID\":\"', c.CategoryID, '\", \"CategoryColor\":\"', c.CategoryColor, '\"}'
                                        ) SEPARATOR ', '
                                    ),
                                    ']'
                                ) AS UserCategories
                            FROM
                                users u
                            LEFT JOIN
                                categorytouser ctu ON u.UserID = ctu.UserID
                            LEFT JOIN
                                categories c ON ctu.CategoryID = c.CategoryID
                            WHERE
                                u.IsAdmin = 0
                            GROUP BY
                                u.UserID, u.Username, u.Email, u.Avatar, u.IsAdmin, u.IsSuperuser;";
        $getAllUsers = $conn->prepare($getAllUsersSQL);
        $getAllUsers->execute();
        $allUsers = $getAllUsers->fetchAll(PDO::FETCH_ASSOC);
        // Check if the user is logged in by checking the session
        if (isset($_SESSION['user'])) {
            $loggedInUser = $_SESSION['user'];

            // Your logic to retrieve categories from the database
            $response = ['status' => true, 'allusers' => $allUsers];
        } else {
            $response = ['status' => false];
        }
        echo json_encode($response);
        break;

    case "POST":
        // Assuming you're receiving data as JSON
        $requestData = json_decode(file_get_contents("php://input"), true);

        // Validate if the required fields are present in the request
        if (!isset($requestData['selectedData'])) {
            echo json_encode(['status' => false, 'message' => 'Invalid request data']);
            exit;
        }

        $selectedData = $requestData['selectedData'];

        // Your logic to delete existing entries for selected users
        foreach ($selectedData as $user => $data) {
            $userId = $data['userId'];
            $categories = $data['categories'];
            $IsSuperuser = $data['IsSuperuser'];

            if ($IsSuperuser) {
                // Delete existing entries for this user
                $stmtDelete = $conn->prepare("DELETE FROM categorytouser WHERE userID = :userId");
                $stmtDelete->bindParam(':userId', $userId);
                $stmtDelete->execute();

                // Insert new entries for this user
                foreach ($categories as $categoryId) {
                    $stmtInsert = $conn->prepare("INSERT INTO categorytouser (userID, categoryID) VALUES (:userId, :categoryId)");
                    $stmtInsert->bindParam(':userId', $userId);
                    $stmtInsert->bindParam(':categoryId', $categoryId);
                    $stmtInsert->execute();
                }

                // Set IsSuperuser = 1 for the user in the users table
                $stmtSetSuperuser = $conn->prepare("UPDATE users SET IsSuperuser = 1 WHERE UserID = :userId");
                $stmtSetSuperuser->bindParam(':userId', $userId);
                $stmtSetSuperuser->execute();
            } else {
                // Delete existing entries for this user
                $stmtDelete = $conn->prepare("DELETE FROM categorytouser WHERE userID = :userId");
                $stmtDelete->bindParam(':userId', $userId);
                $stmtDelete->execute();

                // Set IsSuperuser = 0 for the user in the users table
                $stmtSetSuperuser = $conn->prepare("UPDATE users SET IsSuperuser = 0 WHERE UserID = :userId");
                $stmtSetSuperuser->bindParam(':userId', $userId);
                $stmtSetSuperuser->execute();
            }
        }

        echo json_encode(['status' => true, 'message' => 'Data submitted successfully']);
        break;
}
