import React, { useState, useEffect } from "react";
import CommentForm from "./components/CommentForm";
import Comment from "./components/Comment";
import data from "./data/data.json";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [comments, setComments] = useLocalStorage("comments", []);

  useEffect(() => {
    if (comments.length === 0) {
      setComments(data.comments);
    }
  }, []);

  useEffect(() => {
    // Save comments to local storage on change
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleNewComment = (text) => {
    // Add logic to handle new comment creation
    const newComment = {
      id: Date.now(), // simplistic unique ID generation
      content: text,
      score: 0,
      user: data.currentUser,
      replies: [],
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  const handleCommentUpdate = (id, updatedText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: updatedText };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleCommentDelete = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleAddReply = (commentId, text) => {
    const newReply = {
      id: Date.now(), // simplistic ID generation for example purposes
      parentId: commentId, // Keep track of which comment this is a reply to
      content: text,
      score: 0,
      user: data.currentUser,
      createdAt: new Date().toISOString(),
    };

    setComments((currentComments) => {
      return currentComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
    });
  };

  // Handle updating a reply
  const handleReplyUpdate = (commentId, replyId, updatedText) => {
    setComments((currentComments) =>
      currentComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === replyId) {
                return { ...reply, content: updatedText };
              }
              return reply;
            }),
          };
        }
        return comment;
      })
    );
  };

  // Handle deleting a reply
  const handleReplyDelete = (commentId, replyId) => {
    setComments((currentComments) =>
      currentComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== replyId),
          };
        }

        return comment;
      })
    );
  };

  const handleUpvote = (commentId, replyId) => {
    setComments((currentComments) =>
      currentComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            // Handle upvote for reply
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, score: reply.score + 1 }
                  : reply
              ),
            };
          }
          // Handle upvote for comment
          return { ...comment, score: comment.score + 1 };
        }
        return comment;
      })
    );
  };

  const handleDownvote = (commentId, replyId = null) => {
    setComments((currentComments) =>
      currentComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            // Handle downvote for reply
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, score: reply.score - 1 }
                  : reply
              ),
            };
          }
          // Handle downvote for comment
          return { ...comment, score: comment.score - 1 };
        }
        return comment;
      })
    );
  };

  return (
    <div className='my-8'>
      {comments
        .sort((a, b) => b.score - a.score)
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleUpdate={handleCommentUpdate}
            handleDelete={handleCommentDelete}
            handleReply={handleAddReply}
            handleReplyUpdate={handleReplyUpdate}
            handleReplyDelete={handleReplyDelete}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
          />
        ))}
      <CommentForm submitLabel='SEND' handleSubmit={handleNewComment} />
    </div>
  );
};

export default App;
