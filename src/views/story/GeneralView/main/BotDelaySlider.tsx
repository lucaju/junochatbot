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
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);
  const [initialValue, setInitialValue] = useState(0);

  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    setInitialValue(value);
    return () => {};
  }, []);

  return (
    <>
      {initialValue && (
        <Slider
          aria-labelledby="discrete-slider"
          defaultValue={initialValue}
          onChangeCommitted={(event, newValue) => setValue(newValue)}
          marks={marks}
          max={180}
          step={null}
          valueLabelDisplay="auto"
        />
      )}
    </>
  );
};

export default BotDelaySlider;
