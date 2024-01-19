import React, { useState } from "react";
import CommentForm from "./CommentForm";
import ConfirmationModal from "./ConfirmationModal";

const Reply = ({
  reply,
  handleUpdate,
  handleDelete,
  handleUpvote,
  handleDownvote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const handleUpdateReply = (text) => {
    handleUpdate(reply.parentId, reply.id, text);
    toggleEdit();
  };

  return (
    <div className='ml-4 border-l-2 pl-4 mb-2'>
      {!isEditing ? (
        <>
          <div className='flex justify-between items-center'>
            <h4 className='font-bold'>{reply.user.username}</h4>
            <div>
              {/* Edit and Delete buttons will be conditionally rendered based on the user */}
              <button onClick={toggleEdit} className='text-blue-500'>
                Edit
              </button>
              <button
                onClick={toggleConfirmModal}
                className='text-red-500 ml-2'
              >
                Delete
              </button>
              <div>
                {/* Upvote and Downvote buttons */}
                <button
                  onClick={() => handleUpvote(reply.parentId, reply.id)}
                  aria-label='Upvote'
                  className='mr-2'
                >
                  👍
                </button>
                <span>{reply.score}</span>
                <button
                  onClick={() => handleDownvote(reply.parentId, reply.id)}
                  aria-label='Downvote'
                  className='ml-2'
                >
                  👎
                </button>
              </div>
            </div>
          </div>
          <p>{reply.content}</p>
          {/* Confirmation modal for deletion */}
          {showConfirmModal && (
            <ConfirmationModal
              onConfirm={() => handleDelete(reply.parentId, reply.id)}
              onCancel={toggleConfirmModal}
              message='Are you sure you want to delete this reply?'
            />
          )}
        </>
      ) : (
        <CommentForm
          submitLabel='Update Reply'
          handleSubmit={handleUpdateReply}
          initialText={reply.content}
        />
      )}
    </div>
  );
};

export default Reply;
