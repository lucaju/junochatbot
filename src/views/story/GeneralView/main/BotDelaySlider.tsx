import { Slider } from '@material-ui/core';
import { useField } from 'formik';
import React, { FC, SyntheticEvent, useState } from 'react';

const marks = [
  { value: 0, label: '0' },
  { value: 80, label: '80' },
  { value: 100, label: '100' },
  { value: 120, label: '120' },
  { value: 140, label: '140' },
  { value: 160, label: '160' },
  { value: 180, label: '180' },
];

const BotDelaySlider: FC = () => {
  const [, meta, helpers] = useField('botDelay');
  const { value } = meta;
  const { setValue } = helpers;
  const [sliderValue, setSliderValue] = useState(value);

  const onChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) return;
    setValue(value);
  };

  return (
    <Slider
      aria-labelledby="discrete-slider"
      defaultValue={sliderValue}
      onChangeCommitted={onChangeCommitted}
      marks={marks}
      max={180}
      step={null}
      valueLabelDisplay="auto"
    />
  );
};

export default BotDelaySlider;
