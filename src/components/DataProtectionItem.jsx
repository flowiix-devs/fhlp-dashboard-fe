import React from 'react';

const DataProtectionItem = ({ 
  icon, 
  title, 
  description, 
  iconColor = "text-purple-500",
  status = "Protected" 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <div className={`mr-4 ${iconColor}`}>
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-800">{title}</div>
          <div className="text-gray-500 text-sm">{description}</div>
        </div>
      </div>
      <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
        {status}
      </div>
    </div>
  );
};

export default DataProtectionItem;
