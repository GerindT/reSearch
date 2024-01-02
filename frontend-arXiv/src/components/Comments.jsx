import { Button, Dropdown, Avatar } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";
import ModalAreYouSure from "./Modals/ModalAreYouSure";
import { formatDateDifference } from "../helper/dateHelper";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

function Comments({ comments, setPost, paperId, user }) {
  const apiUrl = !import.meta.env.DEV
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [delId, setDelId] = useState(null);
  const [alert, setAlert] = useState("");

  const msg = "Are you sure you want to delete this comment?";

  const handleEditClick = (commentId, commentBody) => {
    setEditCommentId(commentId);
    setEditedComment(commentBody);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditedComment("");
  };

  const handleSaveEdit = () => {
    const data = {
      action: "updateComment",
      commentId: editCommentId,
      commentText: editedComment,
    };

    fetch(`${apiUrl}/comments.php`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);

        if (data.status === 1) {
          // Simulate updating the comment locally
          const updatedComments = comments.map((comment) =>
            comment.CommentID === editCommentId
              ? {
                  ...comment,
                  CommentText: editedComment,
                  UpdatedAt: data.updatedComment.UpdatedAt,
                }
              : comment
          );

          // Update the state with the edited comments
          setEditCommentId(null);
          setEditedComment("");
          // Update the state with the deleted comment
          setPost((prevState) => {
            // Assuming your post object has a 'Comments' property
            const updatedPost = {
              ...prevState,
              Comments: updatedComments, // Add the new comment at the beginning
            };
            return updatedPost;
          });
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleDeleteClick = (commentId) => {
    // Open the modal to confirm deletion
    setOpenModal(true);
    setDelId(commentId);
  };

  const handleCreateComment = () => {
    const userId = user ? user.UserID : null; // Replace with the actual user ID

    const data = {
      commentText: newComment,
      userId: userId,
      paperId: paperId,
    };

    fetch(`${apiUrl}/comments.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);

        if (data.status === 1) {
          if (comments.length === 0) {
            setPost((prevState) => {
              const updatedPost = {
                ...prevState,
                Comments: [data.newComment], // Replace 'newComment' with the actual key holding your new comment data
              };
              return updatedPost;
            });
          } else {
            // Comment created successfully, fetch updated data and reset newComment
            setPost((prevState) => {
              // Assuming your post object has a 'Comments' property
              const updatedPost = {
                ...prevState,
                Comments: [data.newComment, ...prevState.Comments], // Add the new comment at the beginning
              };
              return updatedPost;
            });
          }

          // Clear the input field

          setNewComment("");
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  const handleConfirmDelete = () => {
    // Simulate deleting the comment locally
    const updatedComments = comments.filter(
      (comment) => comment.CommentID !== delId
    );

    // Close the modal
    const data = {
      action: "deleteComment",
      commentId: delId,
    };

    // Make a request to the server to delete the comment
    fetch(`${apiUrl}/comments.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log(data);
        // Update the state with the deleted comment
        if (data.status === 1) {
          setPost((prevState) => {
            // Assuming your post object has a 'Comments' property
            const updatedPost = {
              ...prevState,
              Comments: updatedComments, // Add the new comment at the beginning
            };

            return updatedPost;
          });
          setOpenModal(false);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
          {alert !== "" && (
            <Alert color="failure" icon={HiInformationCircle}>
              {alert}
            </Alert>
          )}
        </div>
        <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>

          <Button
            type="button"
            pill
            outline
            gradientDuoTone="purpleToBlue"
            onClick={() =>
              user ? handleCreateComment() : setAlert("Please log in")
            }
          >
            Post comment
          </Button>
        </form>
        {comments.map((comment) => (
          <article
            key={comment.CommentID}
            className="p-[1em] text-base bg-white rounded-lg dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <Avatar
                    alt="User settings"
                    img={apiUrl + "/" + comment.Avatar}
                    rounded
                    className="cursor-pointer mr-[1em]  transition duration-100 ease-in transform  hover:scale-110 "
                  />
                  {comment.Username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time
                    pubdate
                    datetime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    {comment.CreatedAt}
                  </time>
                </p>
              </div>
              {user ? (
                user.UserID === comment.UserID ? (
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 3"
                        >
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </>
                    }
                  >
                    <Dropdown.Item
                      onClick={() => {
                        handleDeleteClick(comment.CommentID);
                      }}
                    >
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleEditClick(comment.CommentID, comment.CommentText)
                      }
                    >
                      Edit
                    </Dropdown.Item>
                  </Dropdown>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </footer>

            {editCommentId === comment.CommentID ? (
              <>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="w-full mb-2"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleCancelEdit}
                    pill
                    outline
                    color="failure"
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    pill
                    outline
                    gradientDuoTone="purpleToBlue"
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.CommentText}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400 self-end">
                  {comment.UpdatedAt
                    ? `Edited ${formatDateDifference(comment.UpdatedAt)}`
                    : ""}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
      <ModalAreYouSure
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg={msg}
        paperId={null}
        setVerified={null}
        handleConfirmDelete={handleConfirmDelete}
      />
    </section>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  setPost: PropTypes.func.isRequired,
  paperId: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Comments;
