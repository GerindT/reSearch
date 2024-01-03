<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: https://arxiv-frontend.netlify.app");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header("Access-Control-Allow-Credentials: true");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// echo json_encode($conn ? 'Connected' : 'Failed');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT
                    p.*,
                    GROUP_CONCAT(DISTINCT c.CategoryName) AS Tags,
                    COUNT(DISTINCT f.UserID) AS NumFavorites,
                    CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"CategoryName\":\"', c.CategoryName, '\",\"CategoryID\":\"', c.CategoryID, '\", \"CategoryColor\":\"', c.CategoryColor, '\"}') SEPARATOR ', '), ']') AS Categories,
                    GROUP_CONCAT(DISTINCT c.CategoryID) AS CategoryIDs,
                    GROUP_CONCAT(DISTINCT c.CategoryColor) AS CategoryColors
                FROM
                    papers p
                LEFT JOIN
                    categorytopaper cp ON p.PaperID = cp.PaperID
                LEFT JOIN
                    categories c ON cp.CategoryID = c.CategoryID
                LEFT JOIN
                    favorites f ON p.PaperID = f.PaperID
                GROUP BY
                    p.PaperID";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;
    case "POST":

        if (!isset($_SESSION['user'])) {
            $response = ['status' => 0, 'message' => 'User not logged in.'];
            echo json_encode($response);
            break;
        }

        // Get the user data from the session
        $loggedInUser = $_SESSION['user'];

        // Check if the necessary fields are provided
        if (empty($_POST['title']) || empty($_POST['authors']) || empty($_POST['content']) || empty($_POST['abstract']) || empty($_FILES['file']['name'])) {
            $response = ['status' => 0, 'message' => 'Incomplete data provided.'];
            echo json_encode($response);
            break;
        }

        // Process the uploaded file (PDF or EPUB)
        $allowedFileTypes = ['application/pdf'];
        $uploadDir = 'papers/';
        $fileName = basename($_FILES['file']['name']);
        $filePath = $uploadDir . $fileName;

        if (!in_array($_FILES['file']['type'], $allowedFileTypes)) {
            $response = ['status' => 0, 'message' => 'Invalid file type. Please upload a PDF or EPUB file.'];
            echo json_encode($response);
            break;
        }

        if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            // Insert paper details into the database
            $insertPaperSql = "INSERT INTO papers (title, authors, content, abstract, paperfile, userid) VALUES (:title, :authors, :content, :abstract, :file_path, :user_id)";
            $insertPaperStmt = $conn->prepare($insertPaperSql);
            $insertPaperStmt->bindParam(':title', $_POST['title']);
            $insertPaperStmt->bindParam(':authors', $_POST['authors']);
            $insertPaperStmt->bindParam(':content', $_POST['content']);
            $insertPaperStmt->bindParam(':abstract', $_POST['abstract']);
            $insertPaperStmt->bindParam(':file_path', $filePath);
            $insertPaperStmt->bindParam(':user_id', $loggedInUser['UserID']);

            if ($insertPaperStmt->execute()) {
                // Fetch all data for the inserted record
                $lastInsertId = $conn->lastInsertId();

                // Insert paper categories into the categorytopaper table
                if (!empty($_POST['categories'])) {
                    $categories = json_decode($_POST['categories'], true);

                    foreach ($categories as $category) {
                        $categoryId = $category['CategoryID'];
                        $insertCategorySql = "INSERT INTO categorytopaper (CategoryID, PaperID) VALUES (:category_id, :paper_id)";
                        $insertCategoryStmt = $conn->prepare($insertCategorySql);
                        $insertCategoryStmt->bindParam(':category_id', $categoryId);
                        $insertCategoryStmt->bindParam(':paper_id', $lastInsertId);
                        $insertCategoryStmt->execute();
                    }
                }


                $selectInsertedRecordSql = "SELECT
                    p.*,
                    GROUP_CONCAT(DISTINCT c.CategoryName) AS Tags,
                    COUNT(DISTINCT f.UserID) AS NumFavorites,
                    CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"CategoryName\":\"', c.CategoryName, '\",\"CategoryID\":\"', c.CategoryID, '\", \"CategoryColor\":\"', c.CategoryColor, '\"}') SEPARATOR ', '), ']') AS Categories,
                    GROUP_CONCAT(DISTINCT c.CategoryID) AS CategoryIDs,
                    GROUP_CONCAT(DISTINCT c.CategoryColor) AS CategoryColors
                FROM
                    papers p
                LEFT JOIN
                    categorytopaper cp ON p.PaperID = cp.PaperID
                LEFT JOIN
                    categories c ON cp.CategoryID = c.CategoryID
                LEFT JOIN
                    favorites f ON p.PaperID = f.PaperID
                WHERE p.PaperID = :paper_id
                GROUP BY
                    p.PaperID";

                $selectInsertedRecordStmt = $conn->prepare($selectInsertedRecordSql);
                $selectInsertedRecordStmt->bindParam(':paper_id', $lastInsertId);
                $selectInsertedRecordStmt->execute();
                $insertedRecord = $selectInsertedRecordStmt->fetch(PDO::FETCH_ASSOC);

                $response = ['status' => 1, 'message' => 'Paper created successfully.', 'data' => $insertedRecord];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create paper.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Failed to upload file.'];
        }

        echo json_encode($response);
        break;
}
