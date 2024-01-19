import React, { useState } from "react";

const CommentForm = ({ submitLabel, handleSubmit }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className='mb-4'>
      <textarea
        className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
        rows='3'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='What are your thoughts?'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default CommentForm;
