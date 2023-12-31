<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// echo json_encode($conn ? 'Connected' : 'Failed');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $paperId = isset($_GET['id']) ? intval($_GET['id']) : null;

        if ($paperId) {
            // Use $paperId in the WHERE clause of your SQL query
            $sql = "SELECT
                        p.*,
                        CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"name\":\"', c.CategoryName, '\", \"color\":\"', c.CategoryColor, '\"}') SEPARATOR ', '), ']') AS Categories,
                        COUNT(DISTINCT f.UserID) AS NumFavorites,
                        CONCAT('[',
                            GROUP_CONCAT(
                                CONCAT(
                                    '{\"CommentID\":', co.CommentID, ', \"CommentText\":\"', co.CommentText, '\", \"UserID\":', cu.UserID, ', \"Username\":\"', cu.Username, '\", \"Avatar\":\"', cu.Avatar, '\", \"Email\":\"', cu.Email, '\", \"CreatedAt\":\"', co.CreatedAt, '\"}'
                                )
                                SEPARATOR ', '
                            ),
                            ']'
                        ) AS Comments
                    FROM
                        papers p
                    LEFT JOIN
                        categorytopaper cp ON p.PaperID = cp.PaperID
                    LEFT JOIN
                        categories c ON cp.CategoryID = c.CategoryID
                    LEFT JOIN
                        favorites f ON p.PaperID = f.PaperID
                    LEFT JOIN
                        comments co ON p.PaperID = co.PaperID
                    LEFT JOIN
                        users cu ON co.UserID = cu.UserID
                    WHERE
                        p.PaperID = :paperId
                    GROUP BY
                        p.PaperID";


            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':paperId', $paperId, PDO::PARAM_INT);
            $stmt->execute();
            $paperData = $stmt->fetch(PDO::FETCH_ASSOC);



            echo json_encode($paperData);
        } else {
            echo json_encode(['error' => 'Paper ID not provided.']);
        }
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