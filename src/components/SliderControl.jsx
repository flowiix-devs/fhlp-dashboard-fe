import React from 'react';

const SliderControl = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100,
  formatValue = (val) => `${val}%`,
  className = "mb-6"
}) => {
  // Calculate the percentage for positioning the slider handle
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleSliderChange = (e) => {
    // Get the slider container bounds
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate the new value based on click position
    const clickX = e.clientX - rect.left;
    const newPercentage = (clickX / rect.width) * 100;
    const newValue = min + (newPercentage / 100) * (max - min);
    
    // Clamp the value between min and max
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  return (
    <div className={className}>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500">{formatValue(value)}</span>
      </div>
      <div 
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer" 
        onClick={handleSliderChange}
      >
        <div 
          className="absolute h-2 bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2 cursor-pointer"
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SliderControl;
