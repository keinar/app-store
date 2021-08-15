import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './Filters.css'

function valuetext(value) {
  return `${value}$`;
}

function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sliderFilter">
      <Typography id="range-slider" gutterBottom variant="h4">
        Filter By Price:
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        
      />
    </div>
  );
}

export default RangeSlider;