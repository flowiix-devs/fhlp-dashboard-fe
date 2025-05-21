import React from 'react';
import { Slider, Box, Typography } from '@mui/material';

const SliderControl = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100,
  formatValue = (val) => `${val}%`,
  className = "mb-6"
}) => {
  // Handle slider change from MUI
  const handleSliderChange = (_, newValue) => {
    onChange(newValue);
  };

  return (
    <div className={className}>
      <div className="flex justify-between mb-2">
        <Typography variant="body2" className="text-gray-700">{label}</Typography>
        <Typography variant="body2" className="text-gray-500">{formatValue(value)}</Typography>
      </div>
      <Box sx={{ width: '100%' }}>
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={(max - min) / 100}
          aria-label={label}
          sx={{
            color: 'var(--color-textBlue)',
            height: 8,
            '& .MuiSlider-thumb': {
              height: 16,
              width: 16,
              backgroundColor: 'var(--color-textBlue)',
            },
            '& .MuiSlider-track': {
              height: 8,
              borderRadius: 4,
            },
            '& .MuiSlider-rail': {
              height: 8,
              borderRadius: 4,
              backgroundColor: 'var(--color-grayBg)',
            },
          }}
        />
      </Box>
    </div>
  );
};

export default SliderControl;
