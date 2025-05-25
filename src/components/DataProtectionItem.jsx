import React from 'react';

const DataProtectionItem = ({ 
  icon, 
  title, 
  description, 
  iconColor = "text-purple-500",
  status = true 
}) => {
  return (
    <div style={{ backgroundColor: 'var(--color-grayLight)' }} className="flex items-center justify-between p-4 rounded-lg">
      <div className="flex items-center">
        <div className={`mr-4 ${iconColor}`}>
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-800">{title}</div>
          <div className="text-gray-500 text-sm">{description}</div>
        </div>
      </div>
      <div className={`${status ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} px-3 py-1 rounded-full text-sm`}>
        {status ? 'Protected' : 'Not Protected'}
      </div>
    </div>
  );
};

export default DataProtectionItem;
