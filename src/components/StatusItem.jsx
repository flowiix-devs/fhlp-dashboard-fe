import React from 'react';

const StatusItem = ({ title, description, status = true }) => {
  return (
    <div className={`flex items-center p-4 ${status ? 'bg-green-100' : 'bg-red-100'} rounded-lg`}>
      <div className="flex items-center">
        <div className={`mr-4 ${status ? 'text-green-500' : 'text-red-500'} flex-shrink-0`}>
          {status ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div>
          <div className="font-medium text-gray-800">{title}</div>
          <div className="text-gray-500 text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
