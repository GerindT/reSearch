<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
header("Access-Control-Allow-Credentials: true");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        // Create a new comment
        $input_data = json_decode(file_get_contents('php://input'));

        if (!isset($input_data->commentText) || !isset($input_data->userId) || !isset($input_data->paperId)) {
            echo json_encode(['error' => 'Invalid data provided.']);
            break;
        }

        $commentText = $input_data->commentText;
        $userId = intval($input_data->userId);
        $paperId = intval($input_data->paperId);

        $sqlCreateComment = "INSERT INTO comments (CommentText, UserID, PaperID) VALUES (:commentText, :userId, :paperId)";
        $stmtCreateComment = $conn->prepare($sqlCreateComment);
        $stmtCreateComment->bindParam(':commentText', $commentText, PDO::PARAM_STR);
        $stmtCreateComment->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmtCreateComment->bindParam(':paperId', $paperId, PDO::PARAM_INT);

        if ($stmtCreateComment->execute()) {
            // Fetch the newly created comment details with user information
            $newCommentId = $conn->lastInsertId();
            $sqlFetchComment = "
                SELECT comments.*, users.Username, users.Avatar, users.Email
                FROM comments
                INNER JOIN users ON comments.UserID = users.UserID
                WHERE CommentID = :commentId
            ";
            $stmtFetchComment = $conn->prepare($sqlFetchComment);
            $stmtFetchComment->bindParam(':commentId', $newCommentId, PDO::PARAM_INT);
            $stmtFetchComment->execute();
            $newComment = $stmtFetchComment->fetch(PDO::FETCH_ASSOC);

            echo json_encode(['status' => 1, 'message' => 'Comment created successfully.', 'newComment' => $newComment]);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to create comment.']);
        }
        break;

    case "PUT":
        // Edit an existing comment
        $input_data = json_decode(file_get_contents('php://input'));

        if (!isset($input_data->commentId) || !isset($input_data->commentText)) {
            echo json_encode(['error' => 'Invalid data provided.']);
            break;
        }

        $commentId = intval($input_data->commentId);
        $commentText = $input_data->commentText;

        // Use NOW() to set the UpdatedAt field to the current timestamp
        $sqlEditComment = "UPDATE comments SET CommentText = :commentText, UpdatedAt = NOW() WHERE CommentID = :commentId";
        $stmtEditComment = $conn->prepare($sqlEditComment);
        $stmtEditComment->bindParam(':commentText', $commentText, PDO::PARAM_STR);
        $stmtEditComment->bindParam(':commentId', $commentId, PDO::PARAM_INT);

        if ($stmtEditComment->execute()) {
            // Fetch the updated comment with the new UpdatedAt timestamp
            $sqlFetchUpdatedComment = "SELECT * FROM comments WHERE CommentID = :commentId";
            $stmtFetchUpdatedComment = $conn->prepare($sqlFetchUpdatedComment);
            $stmtFetchUpdatedComment->bindParam(':commentId', $commentId, PDO::PARAM_INT);
            $stmtFetchUpdatedComment->execute();
            $updatedComment = $stmtFetchUpdatedComment->fetch(PDO::FETCH_ASSOC);

            // Include the updated comment in the response
            echo json_encode(['status' => 1, 'message' => 'Comment edited successfully.', 'updatedComment' => $updatedComment]);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to edit comment.']);
        }
        break;


    case "DELETE":
        // Delete an existing comment
        $input_data = json_decode(file_get_contents('php://input'));

        if (!isset($input_data->commentId)) {
            echo json_encode(['error' => 'Comment ID not provided.']);
            break;
        }

        $commentId = intval($input_data->commentId);

        $sqlDeleteComment = "DELETE FROM comments WHERE CommentID = :commentId";
        $stmtDeleteComment = $conn->prepare($sqlDeleteComment);
        $stmtDeleteComment->bindParam(':commentId', $commentId, PDO::PARAM_INT);

        if ($stmtDeleteComment->execute()) {
            echo json_encode(['status' => 1, 'message' => 'Comment deleted successfully.']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to delete comment.']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method.']);
        break;
}
