import React, { useState } from "react";

const CommentForm = ({ submitLabel, handleSubmit }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <div className='bg-white rounded-xl p-4 m-4 max-w-3xl md:mx-auto'>
      <form onSubmit={onSubmit} className=''>
        <textarea
          className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
          rows='3'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a comment...'
        />
        <div className='flex justify-between items-center mt-4'>
          <img
            src='/avatars/image-juliusomo.png'
            alt='avatar'
            className='max-w-[40px]'
          ></img>
          <button
            type='submit'
            className='bg-moderateBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
