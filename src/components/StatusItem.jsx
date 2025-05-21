import React from 'react';

const StatusItem = ({ title, description }) => {
  return (
    <div className="flex items-center p-4 bg-green-100 rounded-lg">
      <div className="flex items-center">
        <div className="mr-4 text-green-500 flex-shrink-0">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
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
