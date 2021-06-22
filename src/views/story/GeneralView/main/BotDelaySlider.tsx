import { Slider } from '@material-ui/core';
import { useField } from 'formik';
import React, { FC, useEffect, useState } from 'react';

interface BotDelaySliderProps {
  name: string;
}

const marks = [
  { value: 0, label: '0' },
  { value: 80, label: '80' },
  { value: 100, label: '100' },
  { value: 120, label: '120' },
  { value: 140, label: '140' },
  { value: 160, label: '160' },
  { value: 180, label: '180' },
];

const BotDelaySlider: FC<BotDelaySliderProps> = ({ name }) => {
  // This isn't an input, so instead of using the values in 'field' directly,
  // we'll use 'meta' and 'helpers'.
  const [, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setSliderValue(value);
    return () => {};
  }, []);

  return (
    <Slider
      aria-labelledby="discrete-slider"
      defaultValue={sliderValue}
      onChangeCommitted={(event, newValue) => setValue(newValue)}
      marks={marks}
      max={180}
      step={null}
      valueLabelDisplay="auto"
    />
  );
};

export default BotDelaySlider;
