import React, { useState } from "react";
import Reply from "./Reply";
import CommentForm from "./CommentForm";
import ConfirmationModal from "./ConfirmationModal";

const Comment = ({
  comment,
  handleUpdate,
  handleDelete,
  handleReply,
  handleReplyUpdate,
  handleReplyDelete,
  handleUpvote,
  handleDownvote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const handleUpdateComment = (text) => {
    handleUpdate(comment.id, text);
    toggleEdit();
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div className='border rounded p-4 mb-2'>
      {!isEditing ? (
        <>
          <div className='flex justify-between'>
            <h3 className='font-bold'>{comment.user.username}</h3>
            <div>
              {/* Upvote and Downvote buttons */}
              <button
                onClick={() => handleUpvote(comment.id)}
                aria-label='Upvote'
                className='mr-2'
              >
                👍
              </button>
              <span>{comment.score}</span>
              <button
                onClick={() => handleDownvote(comment.id)}
                aria-label='Downvote'
                className='ml-2'
              >
                👎
              </button>
            </div>
          </div>
          <p>{comment.content}</p>
          <button onClick={toggleEdit} className='text-blue-500'>
            Edit
          </button>
          <button onClick={toggleConfirmModal} className='text-red-500 ml-2'>
            Delete
          </button>
          <button onClick={toggleReplyForm} className='text-blue-400 ml-2'>
            Reply
          </button>

          {showReplyForm && (
            <CommentForm
              submitLabel='Reply'
              handleSubmit={(text) => {
                handleReply(comment.id, text);
                toggleReplyForm(); // Hide the form after submission
              }}
            />
          )}

          {/* Confirmation modal for deletion */}
          {showConfirmModal && (
            <ConfirmationModal
              onConfirm={() => handleDelete(comment.id)}
              onCancel={toggleConfirmModal}
              message='Are you sure you want to delete this comment?'
            />
          )}
          {/* Replies go here */}
          {comment.replies &&
            comment.replies.map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                handleUpdate={handleReplyUpdate}
                handleDelete={handleReplyDelete}
                handleUpvote={handleUpvote}
                handleDownvote={handleDownvote}
              />
            ))}
        </>
      ) : (
        <CommentForm
          submitLabel='Update Comment'
          handleSubmit={handleUpdateComment}
        />
      )}
    </div>
  );
};

export default Comment;
