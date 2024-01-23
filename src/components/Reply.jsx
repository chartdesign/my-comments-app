import React, { useState } from "react";
import CommentForm from "./CommentForm";
import ConfirmationModal from "./ConfirmationModal";
import data from "../data/data.json";

const Reply = ({
  reply,
  handleUpdate,
  handleDelete,
  handleUpvote,
  handleDownvote,
  handleReply,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const handleUpdateReply = (text) => {
    handleUpdate(reply.parentId, reply.id, text);
    toggleEdit();
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div className='ml-4 border-l-2 p-4 md:py-4 md:pl-8 max-w-3xl md:mx-auto'>
      <div className='bg-white rounded-xl p-4 mr-6'>
        {!isEditing ? (
          <>
            <div className='flex gap-4 items-center'>
              <img
                src={reply.user.image.png}
                alt='avatar'
                className='max-w-[40px]'
              ></img>
              <h3 className='font-bold'>{reply.user.username}</h3>
              <span className='text-gray-400'>{reply.createdAt}</span>
            </div>
            <p className='text-gray-400 my-4'>{reply.content}</p>
            <div className='flex justify-between items-center'>
              <div className='bg-veryLightGray py-2 px-4 text-moderateBlue rounded'>
                {/* Upvote and Downvote buttons */}
                <button
                  onClick={() => handleUpvote(reply.parentId, reply.id)}
                  aria-label='Upvote'
                  className='mr-2'
                >
                  +
                </button>
                <span className='font-bold'>{reply.score}</span>
                <button
                  onClick={() => handleDownvote(reply.parentId, reply.id)}
                  aria-label='Downvote'
                  className='ml-2'
                >
                  -
                </button>
              </div>
              <div className='flex justify-between items-center gap-2'>
                {/* Edit and Delete buttons will be conditionally rendered based on the user */}
                {reply.user.username === "juliusomo" ? (
                  <>
                    <img src='/icon-delete.svg' alt='trash' />
                    <button
                      onClick={toggleConfirmModal}
                      className='text-red-500 ml-2'
                    >
                      Delete
                    </button>
                    <img src='/icon-edit.svg' alt='trash' />
                    <button onClick={toggleEdit} className='text-moderateBlue'>
                      Edit
                    </button>
                  </>
                ) : (
                  <div className='flex gap-2 items-center'>
                    <img src='/icon-reply.svg'></img>
                    <button
                      onClick={toggleReplyForm}
                      className='text-moderateBlue '
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Confirmation modal for deletion */}
            {showConfirmModal && (
              <ConfirmationModal
                onConfirm={() => handleDelete(reply.parentId, reply.id)}
                onCancel={toggleConfirmModal}
                message='Delete comment'
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
      {showReplyForm && (
        <CommentForm
          submitLabel='Reply'
          handleSubmit={(text) => {
            handleReply(reply.id, text);
            toggleReplyForm(); // Hide the form after submission
          }}
        />
      )}
    </div>
  );
};

export default Reply;
