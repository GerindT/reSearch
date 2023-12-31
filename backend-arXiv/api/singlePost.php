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
        $userId = isset($_GET['userId']) ? intval($_GET['userId']) : null;

        if ($paperId) {
            $sql = "SELECT
            p.*,
            CONCAT('[', GROUP_CONCAT(DISTINCT CONCAT('{\"name\":\"', c.CategoryName, '\", \"color\":\"', c.CategoryColor, '\"}') SEPARATOR ', '), ']') AS Categories,
            COUNT(DISTINCT f.UserID) AS NumFavorites,
            CONCAT('[',
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        '{\"CommentID\":', co.CommentID, ', \"CommentText\":\"', co.CommentText, '\", \"UserID\":', cu.UserID, ', \"Username\":\"', cu.Username, '\", \"Avatar\":\"', cu.Avatar, '\", \"Email\":\"', cu.Email, '\", \"CreatedAt\":\"', co.CreatedAt, '\", \"UpdatedAt\":\"', IFNULL(co.UpdatedAt, ''), '\", \"Email\":\"', cu.Email, '\"}'
                    )
                    SEPARATOR ', '
                ),
                ']'
            ) AS Comments";

            if ($userId !== null) {
                $sql .= ",
            CASE
                WHEN EXISTS (SELECT 1 FROM favorites WHERE PaperID = p.PaperID AND UserID = :userId) THEN 1
                ELSE 0
            END AS IsFavorited";
            }

            $sql .= " FROM
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
            $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
            $stmt->execute();
            $paperData = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode($paperData);
        } else {
            echo json_encode(['error' => 'Paper ID or User ID not provided.']);
        }
        break;

    case "PUT":
        $input_data = json_decode(file_get_contents('php://input'));

        if (!isset($input_data->action)) {
            echo json_encode(['error' => 'Action not specified.']);
            break;
        }

        switch ($input_data->action) {
            case "updateVerification":
                $postID = isset($input_data->postID) ? intval($input_data->postID) : null;

                if ($postID) {
                    $currentDate = date('Y-m-d H:i:s'); // Get the current date and time

                    $sql = "UPDATE papers SET isVerified = true, VerifiedDate = :currentDate WHERE PaperID = :postID";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':postID', $postID, PDO::PARAM_INT);
                    $stmt->bindParam(':currentDate', $currentDate);

                    if ($stmt->execute()) {
                        echo json_encode(['status' => 1, 'message' => 'Post verified successfully.', 'verifiedDate' => $currentDate]);
                    } else {
                        echo json_encode(['status' => 0, 'message' => 'Failed to verify post.']);
                    }
                } else {
                    echo json_encode(['error' => 'Post ID not provided.']);
                }
                break;

                // Add other cases for different actions if needed
            case "toggleFavorite":
                $postID = isset($input_data->postID) ? intval($input_data->postID) : null;
                $userID = isset($input_data->userID) ? intval($input_data->userID) : null;

                if ($postID && $userID) {
                    // Check if the user has already favorited the post
                    $sqlCheck = "SELECT * FROM favorites WHERE PaperID = :postID AND UserID = :userID";
                    $stmtCheck = $conn->prepare($sqlCheck);
                    $stmtCheck->bindParam(':postID', $postID, PDO::PARAM_INT);
                    $stmtCheck->bindParam(':userID', $userID, PDO::PARAM_INT);
                    $stmtCheck->execute();
                    $isFavorited = $stmtCheck->rowCount() > 0;

                    if ($isFavorited) {
                        // User has already favorited, so remove the favorite
                        $sqlRemove = "DELETE FROM favorites WHERE PaperID = :postID AND UserID = :userID";
                        $stmtRemove = $conn->prepare($sqlRemove);
                        $stmtRemove->bindParam(':postID', $postID, PDO::PARAM_INT);
                        $stmtRemove->bindParam(':userID', $userID, PDO::PARAM_INT);

                        if ($stmtRemove->execute()) {
                            echo json_encode(['status' => 1, 'message' => 'Post removed from favorites.', 'statusVal' => false]);
                        } else {
                            echo json_encode(['status' => 0, 'message' => 'Failed to remove post from favorites.']);
                        }
                    } else {
                        // User has not favorited, so add the favorite
                        $sqlAdd = "INSERT INTO favorites (PaperID, UserID) VALUES (:postID, :userID)";
                        $stmtAdd = $conn->prepare($sqlAdd);
                        $stmtAdd->bindParam(':postID', $postID, PDO::PARAM_INT);
                        $stmtAdd->bindParam(':userID', $userID, PDO::PARAM_INT);

                        if ($stmtAdd->execute()) {
                            echo json_encode(['status' => 1, 'message' => 'Post added to favorites.', 'statusVal' => true]);
                        } else {
                            echo json_encode(['status' => 0, 'message' => 'Failed to add post to favorites.']);
                        }
                    }
                } else {
                    echo json_encode(['error' => 'Post ID or User ID not provided.']);
                }
                break;
            default:
                echo json_encode(['error' => 'Invalid action specified.']);
                break;
        }
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