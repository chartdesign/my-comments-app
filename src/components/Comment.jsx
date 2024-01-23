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
    <section className=''>
      <div className='rounded-xl p-4 m-4 bg-white max-w-3xl md:mx-auto'>
        {!isEditing ? (
          <>
            {/* visible on medium and up. Upvote and Downvote buttons */}
            <div className='hidden md:flex flex-col bg-veryLightGray py-2 px-4 text-moderateBlue rounded float-left mr-4  items-center'>
              <button
                onClick={() => handleUpvote(comment.id)}
                aria-label='Upvote'
                className='mr-2'
              >
                <img
                  src='/icon-plus.svg'
                  alt='plus'
                  className='ml-1 my-2'
                ></img>
              </button>
              <span className='font-bold my-2'>{comment.score}</span>
              <button
                onClick={() => handleDownvote(comment.id)}
                aria-label='Downvote'
                className='ml-2'
              >
                <img
                  src='/icon-minus.svg'
                  alt='plus'
                  className='mr-2 my-2'
                ></img>
              </button>
            </div>
            <div className='flex flex-col'>
              <div className='flex gap-4 items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <img
                    src={comment.user.image.png}
                    alt='avatar'
                    className='max-w-[40px]'
                  ></img>
                  <h3 className='font-bold'>{comment.user.username}</h3>
                  <span className='text-gray-400'>{comment.createdAt}</span>
                </div>

                {/* Reply button is visible on medium screens */}
                <div className='hidden md:flex gap-2 items-center'>
                  <img src='/icon-reply.svg'></img>
                  <button
                    onClick={toggleReplyForm}
                    className='text-moderateBlue '
                  >
                    Reply
                  </button>
                </div>
              </div>
              <p className='text-gray-400 my-4'>{comment.content}</p>
            </div>
            {/* This section is visible on small screens */}
            <div className='flex justify-between items-center md:hidden'>
              <div className='bg-veryLightGray py-2 px-4 text-moderateBlue rounded'>
                {/* Upvote and Downvote buttons */}
                <button
                  onClick={() => handleUpvote(comment.id)}
                  aria-label='Upvote'
                  className='mr-2'
                >
                  +
                </button>
                <span className='font-bold'>{comment.score}</span>
                <button
                  onClick={() => handleDownvote(comment.id)}
                  aria-label='Downvote'
                  className='ml-2'
                >
                  -
                </button>
              </div>

              <div className='flex gap-2 items-center'>
                <img src='/icon-reply.svg'></img>
                <button
                  onClick={toggleReplyForm}
                  className='text-moderateBlue '
                >
                  Reply
                </button>
              </div>
            </div>

            {/* Confirmation modal for deletion */}
            {showConfirmModal && (
              <ConfirmationModal
                onConfirm={() => handleDelete(comment.id)}
                onCancel={toggleConfirmModal}
                message='Are you sure you want to delete this comment?'
              />
            )}
          </>
        ) : (
          <CommentForm
            submitLabel='Update Comment'
            handleSubmit={handleUpdateComment}
          />
        )}
      </div>
      {showReplyForm && (
        <CommentForm
          submitLabel='Reply'
          handleSubmit={(text) => {
            handleReply(comment.id, text);
            toggleReplyForm(); // Hide the form after submission
          }}
        />
      )}
      <div className='md:ml-20'>
        {/* Replies go here */}
        {comment.replies &&
          comment.replies
            .sort((a, b) => b.score - a.score)
            .map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                handleUpdate={handleReplyUpdate}
                handleDelete={handleReplyDelete}
                handleUpvote={handleUpvote}
                handleDownvote={handleDownvote}
                handleReply={handleReply}
              />
            ))}
      </div>
    </section>
  );
};

export default Comment;
