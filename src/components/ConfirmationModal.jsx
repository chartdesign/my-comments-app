import React from "react";

const ConfirmationModal = ({ onConfirm, onCancel, message }) => {
  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
      id='my-modal'
    >
      <div className='relative top-1/3 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            {message}
          </h3>
          <div className='mt-2'>
            <p className='text-base text-gray-500'>
              Actions taken cannot be undone. Are you sure you want to proceed?
            </p>
          </div>
          <div className='flex justify-center gap-4 mt-4'>
            <button
              id='cancel-btn'
              className='px-4 py-2 bg-gray-300 text-gray-900 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300'
              onClick={onCancel}
            >
              NO, CANCEL
            </button>
            <button
              id='delete-btn'
              className='px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
              onClick={onConfirm}
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
