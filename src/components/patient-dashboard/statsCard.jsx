import React from "react";

const StatCard = ({ headerText, icon, amount, growthAmount, growthText }) => {
  return (
    <div className="bg-cardBg border-gray-100 border-[1px] p-4 rounded-lg shadow-md flex flex-col gap-2 w-full max-w-sm">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-500">{headerText}</h4>
        {icon && <div className="text-xl">{icon}</div>}
      </div>
      <div className="text-2xl font-bold">{amount}</div>
      <div className="text-sm text-green-500">
        +{growthAmount} <span className="text-gray-500"> {growthText}</span>
      </div>
    </div>
  );
};

export default StatCard;
