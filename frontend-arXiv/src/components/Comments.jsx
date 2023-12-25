import { Button, Dropdown, Avatar } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";
import ModalAreYouSure from "./Modals/ModalAreYouSure";

function Comments({ comments, setComments }) {
  const [openModal, setOpenModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

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
    // Simulate updating the comment locally
    const updatedComments = comments.map((comment) =>
      comment.id === editCommentId
        ? { ...comment, body: editedComment }
        : comment
    );

    // Update the state with the edited comments
    setEditCommentId(null);
    setEditedComment("");
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    // Simulate adding a new comment locally
    const newCommentObj = {
      id: comments.length + 1, // Generate a unique ID (replace with a proper ID generation logic)
      name: "John Doe", // Replace with the actual user's name
      email: "john@example.com", // Replace with the actual user's email
      body: newComment,
      date: new Date().toLocaleDateString(), // Use the current date and time
    };

    // Update the state with the new comment
    setComments([...comments, newCommentObj]);

    // Clear the input field
    setNewComment("");
  };

  const handleDeleteClick = (commentId) => {
    // Open the modal to confirm deletion
    setOpenModal(true);

    // Set the verified state to false initially
    setVerified(false);

    // Set the ID of the comment to be deleted
    setEditCommentId(commentId);
  };

  const handleConfirmDelete = () => {
    // Simulate deleting the comment locally
    const updatedComments = comments.filter(
      (comment) => comment.id !== editCommentId
    );

    // Update the state with the deleted comment
    setComments(updatedComments);

    // Clear the edit state and close the modal
    setEditCommentId(null);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
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
            onClick={handleAddComment}
          >
            Post comment
          </Button>
        </form>
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                    className="cursor-pointer mr-[1em]  transition duration-100 ease-in transform  hover:scale-110 "
                  />
                  {comment.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time
                    pubdate
                    datetime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    {comment.date}
                  </time>
                </p>
              </div>

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
                    handleDeleteClick(comment.id);
                  }}
                >
                  Delete
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleEditClick(comment.id, comment.body)}
                >
                  Edit
                </Dropdown.Item>
              </Dropdown>
            </footer>

            {editCommentId === comment.id ? (
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
              <p className="text-gray-500 dark:text-gray-400">{comment.body}</p>
            )}
          </article>
        ))}
      </div>
      <ModalAreYouSure
        openModal={openModal}
        setOpenModal={setOpenModal}
        msg={msg}
        setVerified={setVerified}
        handleConfirmDelete={handleConfirmDelete}
      />
    </section>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  setComments: PropTypes.func.isRequired,
};

export default Comments;
