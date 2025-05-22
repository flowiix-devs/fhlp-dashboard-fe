import React from 'react';

const StatCard = ({ title, value, subtitle, icon, iconColor = "text-blue-600" }) => {
  return (
    <div style={{ backgroundColor: 'var(--color-cardBg)' }} className="p-4 rounded-lg shadow-sm">
      <div className="mb-2 text-gray-600 text-sm">{title}</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-bold text-gray-800">{value}</div>
          <div className="text-green-500 text-xs">{subtitle}</div>
        </div>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
